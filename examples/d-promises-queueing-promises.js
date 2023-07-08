/**
 * This example showcases how callbacks passed to promise.then are enqueued in the microtask queue of
 * the same iteration of the event loop in which the promise was resolved. A consequence of this
 * is that these microtask callbacks prevent the event loop from moving on to the next iteration
 * and "block" the event loop from firing callbacks enqueued for the timers and io phases of
 * the next iteration. This is considered an anti-pattern as there's no performance benefit to
 * doing this, it's only extra overhead.
 */

const { log } = require('../utils/async-hooks');

log('A');

const promise1 = new Promise((resolve) => {
  log('B');
  resolve();
});

const promise2 = new Promise((resolve) => {
  log('C');
  resolve();
});

const promise3 = new Promise((resolve) => {
  log('D');
  resolve();
});

setTimeout(() => {
  // Fires at the start of the next iteration of the event loop after the promise (microtask)
  // queue of the first iteration is exhausted.
  log('N');
});

promise1
  .then(() => {
    log('F');
    promise2
      .then(() => {
        log('H');
        promise3
          .then(() => {
            log('J');
            const promise4 = new Promise((resolve) => {
              log('K');
              resolve();
            });
            promise4
              .then(() => {
                log('M');
              })
              .catch((err) => {
                log(err);
              });
            log('L');
          })
          .catch((err) => {
            log(err);
          });
        log('I');
      })
      .catch((err) => {
        log(err);
      });
    log('G');
  })
  .catch((err) => {
    log(err);
  });

log('E');
