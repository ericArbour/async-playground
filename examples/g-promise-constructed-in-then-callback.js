/**
 * This example is code you should never write, but mirrors the previous f-async-function-calling
 * example to illustrate how calling an async function is effectively a promise constructor.
 */

const { log } = require('../utils/async-hooks');

log('A');

setTimeout(() => {
  // Fires at the start of the next iteration of the event loop after the promise (microtask)
  // queue of the first iteration is exhausted.
  log('O');
});

log('B');

const promise1 = new Promise((resolve) => {
  log('C');
  resolve();
});

promise1.then(() => {
  log('E');
  log('F');
  const promise2 = new Promise((resolve) => {
    log('G');
    resolve();
  });
  promise2.then(() => {
    log('H');
    log('I');
    const promise3 = new Promise((resolve) => {
      log('J');
      resolve();
    });
    promise3.then(() => {
      log('K');
      log('L');
      const promise4 = new Promise((resolve) => {
        log('M');
        resolve();
      });
      promise4.then(() => {
        log('N');
      });
    });
  });
});

log('D');
