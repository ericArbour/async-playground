const { log } = require('../utils/async-hooks');

log('A');

const promise = new Promise((resolve) => {
  log('B'); // Promise executor function called synchronously, same execution context as A and C
  resolve('D');
});

promise
  .then((value) => {
    log(value);
  })
  .catch((err) => {
    log(err);
  });

log('C');
