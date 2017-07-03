/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-07-03 10:06:17
 * @Last modified by:   yzf
 * @Last modified time: 2017-07-03 10:12:07
 */

import addDOMEventListener from 'add-dom-event-listener';
import ReactDOM from 'react-dom';

export default function addEventListenerWrap(target, eventType, cb) {
  const callback = ReactDOM.unstable_batchedUpdates ? function run(e) {
    ReactDOM.unstable_batchedUpdates(cb, e);
  } : cb;
  return addDOMEventListener(target, eventType, callback);
}
