/**
 * This example showcases how .then and await are very similar, but mixing them is hard to
 * reason about and should be avoided because it's difficult to context switch between them.
 * The callbacks passed to a promise's .then function and the code to be executed after an
 * awaited promise in an async function are both enqueued in the microtask queue with
 * the same precedence.
 */

const { log } = require('../utils/async-hooks');

log('A');

// Returns a promise, but can't do any fancy internal awaiting
function promiseReturningFunction(inBody, inConstructor) {
  log(inBody);

  const promise = new Promise((resolve) => {
    // Called in the same execution context as inBody because promise constructors are synchronous
    log(inConstructor);
    resolve();
  });

  return promise;
}

const promise = promiseReturningFunction('B', 'C');

promise.then(() => {
  log('F'); // Called before I because this callback was enqueued first

  const promise2 = promiseReturningFunction('G', 'H');
  promise2.then(() => {
    // Fires between K and M because this .then callback is enqueued between those two awaits
    log('L');
  });
});

(async () => {
  log('D');
  await promise; // Everything after this await is effectively a .then callback
  log('I');
  // prettier-ignore
  await promiseReturningFunction('J', 'K') || await promiseReturningFunction('M', 'N'); // Ew
  log('O');
})();

log('E');
