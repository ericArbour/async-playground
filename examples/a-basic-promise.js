/**
 * This example showcases how promise constructor functions are called immediately in the
 * execution context where the promise is created, but even if the promise is resolved
 * immediately in that same execution context, the callbacks passed to promise.then are deferred
 * to the microtask phase of that same event loop iteration.
 */

const { log } = require('../utils/async-hooks');

log('A');

const promise = new Promise((resolve) => {
  log('B'); // Promise constructor function called synchronously, same execution context as A and C
  resolve();
});

promise
  .then(() => {
    log('D');
  })
  .catch((err) => {
    log(err);
  });

log('C');
