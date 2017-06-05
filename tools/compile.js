/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-05-15 16:07:35
 * @Last modified by:   yzf
 * @Last modified time: 2017-05-15 16:08:34
 */

import runGulpTask from './runGulpTask';

export default async function compile() {
  await runGulpTask('compile');
}
