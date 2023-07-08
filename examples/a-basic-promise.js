/**
 * This example showcases how promise constructor functions are called immediately in the
 * execution context where the promise is created, but even if the promise is resolved
 * immediately in that same execution context, the callbacks passed to promise.then are deferred
 * to the microtask phase of that same event loop iteration.
 */

const { log } = require('../utils/async-hooks');

log('A');

const promise = new Promise((resolve) => {
  // Promise constructor function called synchronously, same execution context as A and C
  log('B');
  // Calling the resolve function sets a promise object to the "resolved" state, which happens
  // synchronously (see output)
  resolve();
});

promise
  // Even though this promise is already in a resolved state, the callbacks passed to .then get
  // put into the microtask queue which is exhausted after the root execution context, which is
  // why C beats D
  .then(() => {
    log('D');
  });

log('C');
