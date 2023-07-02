const async_hooks = require('async_hooks');
const fs = require('fs');

const { stdout } = require('node:process');
const { fd } = stdout;

const asyncIdToName = new Map([[1, 'ROOT(1)']]);

let indent = 0;
async_hooks
  .createHook({
    init(asyncId, type, triggerAsyncId) {
      const eid = async_hooks.executionAsyncId();
      const indentStr = ' '.repeat(indent);
      const name = `${type}(${asyncId})`;
      asyncIdToName.set(asyncId, name);
      const triggerName = asyncIdToName.get(triggerAsyncId);
      const eName = asyncIdToName.get(eid);
      fs.writeSync(
        fd,
        `${indentStr}${name}:` +
          ` trigger: ${triggerName}, execution: ${eName}\n`
      );
    },
    before(asyncId) {
      const indentStr = ' '.repeat(indent);
      const name = asyncIdToName.get(asyncId);
      fs.writeSync(fd, `${indentStr}before:  ${name}\n`);
      indent += 2;
    },
    after(asyncId) {
      indent -= 2;
      const indentStr = ' '.repeat(indent);
      const name = asyncIdToName.get(asyncId);
      fs.writeSync(fd, `${indentStr}after:  ${name}\n`);
    },
    destroy(asyncId) {
      const indentStr = ' '.repeat(indent);
      const name = asyncIdToName.get(asyncId);
      fs.writeSync(fd, `${indentStr}destroy:  ${name}\n`);
    },
    promiseResolve(asyncId) {
      const indentStr = ' '.repeat(indent);
      const name = asyncIdToName.get(asyncId);
      fs.writeSync(fd, `${indentStr}promiseResolve:  ${name}\n`);
    },
  })
  .enable();

function log(...args) {
  const indentStr = ' '.repeat(indent);
  const eid = async_hooks.executionAsyncId();
  const name = asyncIdToName.get(eid);
  console.log(
    `${indentStr}------------------------------ ${name}: ------------------------------`,
    ...args
  );
}

module.exports = {
  log,
};
