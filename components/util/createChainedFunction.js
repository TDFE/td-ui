/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-06-21 16:04:55
 * @Last modified by:   yzf
 * @Last modified time: 2017-06-21 16:04:56
 */

export default function createChainedFunction(...funcs) {
  const fucsCopy = [].slice.call(funcs, 0);
  if (fucsCopy.length === 1) {
    return fucsCopy[0];
  }
  return function chainedFunction(...args) {
    for (let i = 0; i < fucsCopy.length; i++) {
      if (fucsCopy[i] && fucsCopy[i].apply) {
        fucsCopy[i].apply(this, args);
      }
    }
  };
}
