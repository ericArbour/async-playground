const { log } = require('../utils/async-hooks');

log('A');

const promise = new Promise((resolve) => {
  log('B'); // Promise executor function called synchronously, same execution context as A and C
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
