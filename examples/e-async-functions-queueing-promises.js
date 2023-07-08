/**
 * This example is the same anti-pattern as d-promises-queueing-promises.js but with async functions.
 * Note that the await keyword's magic is that it pauses the execution of an individual function and
 * defers the code evaluated after the awaited expression to the microtask queue of the event loop
 * iteration in which the promise was resolved. In this example, because all of these named async
 * functions run to completion synchronously, the result is all of them are enqueuing the microtask
 * queue in the same iteration of the event loop, blocking the setTimeout which is called in the next
 * iteration of the event loop. Note the linear readability improvements that async functions provide.
 */

const { log } = require('../utils/async-hooks');

log('A');

async function asyncFunction1() {
  log('B');
}
const promise1 = asyncFunction1();

async function asyncFunction2() {
  log('C');
}
const promise2 = asyncFunction2();

async function asyncFunction3() {
  log('D');
}
const promise3 = asyncFunction3();

setTimeout(() => {
  // Fires at the start of the next iteration of the event loop after the promise (microtask)
  // queue of the first iteration is exhausted.
  log('O');
});

try {
  (async () => {
    // Beats F because this async function is an async Immediately Invoked Function Expression,
    // which executes synchronously until its first await keyword.
    log('E');
    await promise1;
    // The double calls to log after each await looks odd here, but showcases the readability
    // improvements of async/await.
    log('G');
    log('H');
    await promise2;
    log('I');
    log('J');
    await promise3;
    log('K');
    async function asyncFunction4() {
      log('L');
    }
    const promise4 = asyncFunction4();
    log('M');
    await promise4;
    log('N');
  })();
} catch (err) {
  log(err);
}

log('F'); // Still called in the root execution context before await promise1
