/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-06-21 16:04:55
 * @Last modified by:   yzf
 * @Last modified time: 2017-06-21 16:04:56
 */

export default function createChainedFunction(...args) {
  const argsCopy = [].slice.call(args, 0);
  if (argsCopy.length === 1) {
    return argsCopy[0];
  }
  return function chainedFunction() {
    for (let i = 0; i < argsCopy.length; i++) {
      if (argsCopy[i] && argsCopy[i].apply) {
        argsCopy[i].apply(this, args);
      }
    }
  };
}
