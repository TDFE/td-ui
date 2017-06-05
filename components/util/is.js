/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-05-22 13:58:46
 * @Last modified by:   yzf
 * @Last modified time: 2017-05-22 13:59:48
 */

function type(obj) {
  return Object.prototype.toString.call(obj)
}

exports.String = obj => type(obj) === '[object String]'
exports.Array = obj => type(obj) === '[object Array]'
exports.Object = obj => type(obj) === '[object Object]'
exports.Boolean = obj => type(obj) === '[object Boolean]'
exports.Function = obj => type(obj) === '[object Function]'
exports.Number = obj => typeof obj === 'number'
exports.nil = obj => obj === null || obj === undefined
