/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-05-16 15:31:06
 * @Last modified by:   yzf
 * @Last modified time: 2017-05-16 15:31:08
 */

import runGulpTask from './runGulpTask';
import open from 'open';
import run from 'tdtool/lib/util/run-command';
import start from 'tdtool/lib/cmds/start';

export default async function component() {
  run(start.bind(undefined,{config:'./tools/tdtool.config.comp.js',port:8080}));
  // await runGulpTask('component');
  await open('http://localhost:8080');
}
