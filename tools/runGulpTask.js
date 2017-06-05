/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-05-16 16:10:05
 * @Last modified by:   yzf
 * @Last modified time: 2017-05-16 16:10:37
 */

 import logger from './utils/logger';
 import gulp from 'gulp';

 export default function runGulpTask(task) {
  require('./gulpfile');
  return new Promise((resolve, reject) => {
    gulp.start(task, function(err) {
      if (err) {
        logger.error(err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
 }
