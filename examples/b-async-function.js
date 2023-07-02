// NOTE this example mirrors a-basic-promise.js, but with an async function

const { log } = require('../utils/async-hooks');

log('A');

async function asyncFunction() {
  log('B');
  return;
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
