/**
 * This example mirrors a-basic-promise.js, but with an async function. Note that async functions
 * resolve when they return, which in this case is implicitly.
 */

const { log } = require('../utils/async-hooks');

log('A');

async function asyncFunction() {
  log('B');
}

// Async functions return promises
const promise = asyncFunction();

promise
  .then(() => {
    log('D');
  })
  .catch((err) => {
    log(err);
  });

log('C');
