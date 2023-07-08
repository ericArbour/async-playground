/**
 * This example showcases the difference between the execution context in which an async function
 * is called vs the execution context in which an async function is awaited. It is to be contrasted
 * with example e-async-functions-queueing-promises. The difference between these two examples is that
 * here the async functions are called in the same execution context in which they are awaited, whereas
 * in the other example they are called in the execution context in which they were defined. This
 * illustrates how async functions are essentially synchronous promise constructors up until their
 * first await keyword.
 */

const { log } = require('../utils/async-hooks');

log('A');

async function asyncFunction1() {
  log('C');
}

async function asyncFunction2() {
  log('G');
}

async function asyncFunction3() {
  log('J');
}

setTimeout(() => {
  // Fires at the start of the next iteration of the event loop after the promise (microtask)
  // queue of the first iteration is exhausted.
  log('O');
});

try {
  (async () => {
    log('B');
    await asyncFunction1();
    // The double calls to log after each await looks odd here, but showcases the readability
    // improvements of async/await.
    log('E');
    log('F');
    await asyncFunction2();
    log('H');
    log('I');
    await asyncFunction3();
    log('K');
    async function asyncFunction4() {
      log('M');
    }
    log('L');
    await asyncFunction4();
    log('N');
  })();
} catch (err) {
  log(err);
}

// Still called in the root execution context before asyncFunction1() resolves, but after the
// log in asyncFunction1 which runs synchronously in the same execution context.
log('D');
