# async-playground

Exercises inspired by https://github.com/jasnell/broken-promises.

### Trace Node

1. Run scripts with `node --trace-events-enabled file.js`.
2. Open output log file in `chrome://tracing/`.

### Resources

1. https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick
2. https://stackoverflow.com/questions/43036229/is-it-an-anti-pattern-to-use-async-await-inside-of-a-new-promise-constructor

### TODOs

1. Finish empty files.
2. Confirm understanding of microtask queue being emptied after each event loop phase is reflected in examples.
3. Add practical examples such as "async request queue" example: I have a queue, it returns a promise, you have to hand it a promise factory, when they call the promise factory, your job gets to execute, the async request queue can only have up to 3 running tasks at any one time.
