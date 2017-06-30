/**
 * Created by therfaint- on 20/06/2017.
 */
/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-05-16 14:49:49
 * @Last modified by:   yzf
 * @Last modified time: 2017-05-16 18:33:09
 */

import React from 'react';
import ReactDOM from 'react-dom';

const MOUNT_NODE = document.getElementById('app');

let render = () => {
  let Switch = require('../index').default;
  function handleChange(bool) {
    console.log(bool);
  }
  ReactDOM.render(
    <div style={{marginLeft: 20}}>
      <Switch onChange={handleChange} unCheckedChildren={'1'} checkedChildren={'0'} size="default"/>
      <Switch onChange={handleChange} size="small"/>
    </div>, MOUNT_NODE);
};

try {
  render();
} catch (e) {
  console.log(e);
}

if (module.hot) {
  module.hot.accept(['../index'], () => {
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(MOUNT_NODE);
      render();
    });
  });
}
