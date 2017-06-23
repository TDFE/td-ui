/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-06-13 17:19:20
 * @Last modified by:   yzf
 * @Last modified time: 2017-06-13 17:19:21
 */

import shallowEqual from 'shallowequal';

module.exports = {
  shouldComponentUpdate(nextProps, nextState) {
    return ((instance, nextProps, nextState) =>
      (!shallowEqual(instance.props, nextProps) || !shallowEqual(instance.state, nextState))
    )(this, nextProps, nextState);
  }
};
