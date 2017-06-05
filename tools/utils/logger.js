/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-04-25 16:46:26
 * @Last modified by:   yzf
 * @Last modified time: 2017-04-25 16:47:48
 */

import { format } from 'util'
import chalk from 'chalk'
const version = require('../../package.json').version

const prefix = `[td-ui@${version}]`
const sep = chalk.gray('-')

function formatTime(time) {
 return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
}

/**
 * Log a `message` to the console
 *
 * @param {String} message
 */
exports.info = function() {
  const msg = format.apply(format, arguments)
  const time = new Date()
  console.log(chalk.cyan(`${prefix}[${formatTime(time)}]`), sep, msg)
}

/**
 * Log an error `message` to the console and not exit
 *
 * @param {String} message
 */
exports.error = function(message) {
  if (message instanceof Error) {
    message = message.message.trim()
  }

  const msg = format.apply(format, arguments)
  const time = new Date()
  console.error(chalk.red(`${prefix}[${formatTime(time)}]`), sep, msg)
}

/**
 * Log an error `message` to the console and exit
 *
 * @param {String} message
 */
exports.fatal = function(msg) {
  exports.error(msg)
  process.exit(1)
}

/**
 * Log a warning `message` to the console
 *
 * @param {String} message
 */
exports.warn = function() {
  const msg = format.apply(format, arguments)
  const time = new Date()
  console.log(chalk.yellow(`${prefix}[${formatTime(time)}]`), sep, msg)
}

/**
 * Log a success `message` to the console
 *
 * @param {String} message
 */
exports.success = function() {
  const msg = format.apply(format, arguments)
  const time = new Date()
  console.log(chalk.green(`${prefix}[${formatTime(time)}]`), sep, msg)
}
