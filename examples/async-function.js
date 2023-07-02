const { log } = require('../utils/async-hooks');

log('A');

async function asyncFunction() {
  log('B');
  return 'D';
}

const promise = asyncFunction();

promise
  .then((value) => {
    log(value);
  })
  .catch((err) => {
    log(err);
  });

log('C');
