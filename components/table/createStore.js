/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-07-04 10:33:50
 * @Last modified by:   yzf
 * @Last modified time: 2017-07-04 10:33:52
 */

export default function createStore(initialState) {
  let state = initialState;
  const listeners = [];

  function setState(partial) {
    state = Object.assign({}, state, partial);
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
