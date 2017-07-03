/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-07-03 10:03:38
 * @Last modified by:   yzf
 * @Last modified time: 2017-07-03 10:03:39
 *
 * a fork of table
 */

export default function createStore(initialState) {
  let state = initialState;
  const listeners = [];

  function setState(partial) {
    state = { ...state, ...partial };
    for (let i = 0; i < listeners.length; i++) {
      listeners[i]();
    }
  }

  function getState() {
    return state;
  }

  function subscribe(listener) {
    listeners.push(listener);

    return function unsubscribe() {
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  }

  return {
    setState,
    getState,
    subscribe
  };
}
