/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-05-15 16:01:37
 * @Last modified by:   yzf
 * @Last modified time: 2017-05-15 16:01:39
 */

import logger from './utils/logger'

function run(fn, options) {
 const task = typeof fn.default === 'undefined' ? fn : fn.default;
 const start = new Date();
 logger.success(`Starting '${task.name}${options ? ` (${options})` : ''}'...`)
 return task(options).then((resolution) => {
   const end = new Date();
   const time = end.getTime() - start.getTime();
   logger.success(`Finished '${task.name}${options ? ` (${options})` : ''}' after ${time} ms`)
   return resolution;
 });
}

if (require.main === module && process.argv.length > 2) {
 delete require.cache[__filename];
 const module = require(`./${process.argv[2]}.js`).default;
 run(module).catch((err) => { console.error(err.stack); process.exit(1); });
}

export default run;
