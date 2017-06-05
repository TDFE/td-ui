/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-05-15 15:58:29
 * @Last modified by:   yzf
 * @Last modified time: 2017-05-16 17:57:43
 */
import fs from 'fs'
import path from 'path';
import logger from './utils/logger';
module.exports =((component) => {
  const Config = require('tdtool').Config;
  const entry = `components/${component}/demo/index.js`;
  if (!fs.existsSync(path.resolve(process.cwd(), entry))) {
    logger.fatal(`Demo file ${entry} does not exist.`)
    return
  }
  const config = new Config({
    entry: `./${entry}`,
    dist: './dist/' + component,
    devServer:true,
    sourceMap: true,
    extends: [['react', {
      eslint: true,
      source: [path.resolve(process.cwd(), 'components')]
    }], ['less', {
      extractCss: true
    }]],
    template: './tools/index.tpl'
  });
  return [config.resolve()];
})(require('yargs').parse(process.argv.slice(3))._[0])
