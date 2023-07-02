const { log } = require('../utils/async-hooks');

log('A');

setTimeout(() => {
  for (let i = 0; i < 1e9; i++) {
    // Arbitrary work
  }
  log('E');

  setTimeout(() => {
    // Fires in the event loop iteration after the iteration that fires E, F, and G.
    log('H');
  }, 0);
}, 0);

setTimeout(() => {
  // Faster executing setTimeout callback, but is blocked by the first setTimeout registered
  // in this execution context.
  log('F');
}, 0);

const promise = new Promise((resolve) => {
  log('B');
  resolve();
});

promise
  .then(() => {
    log('D'); // Promise resolution callbacks fire at the end of the current event loop iteration
    setTimeout(() => {
      // This setTimeout is called in the same event loop iteration as the setTimeouts called in the
      // root execution context. The callback is called in the same event loop iteration as E and F
      log('G');
    }, 0);
  })
  .catch((err) => {
    log(err);
  });

log('C');
