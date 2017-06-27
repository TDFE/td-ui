/**
 * Created by wxy on 2017/6/16.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import options from './option';

const MOUNT_NODE = document.getElementById('app');

// showEnd 仅显示末端选项
// allowClear 是否支持清除
// hoverOpen 移入展开
let render = () => {
  let Cascader = require('../index').default;
  ReactDOM.render(
    <Cascader
      options={options}
      selectedIndex="0"
      placeholder="请选择城市"
      allowClear
    />, MOUNT_NODE
  );
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
    })
  })
}
