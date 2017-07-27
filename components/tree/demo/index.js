
/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import Basic from './basic';
import Control from './control';
import LoadData from './loadData';
import Line from './line';
import Filter from './filter';
import Drag from './drag';
const MOUNT_NODE = document.getElementById('app');

let Tree = require('../index').default;
let TreeNode = Tree.TreeNode;

let render = () => {
  /* eslint-disable no-unused-vars */
  function Demo() {
    return (
      <div className="td">
        <p>基本</p>
        <Basic />
        <p>我是分割线我是分割线</p>
        <p>受控操作示例</p>
        <Control />
        <p>我是分割线我是分割线</p>
        <p>异步加载数据</p>
        <LoadData />
        <p>我是分割线我是分割线</p>
        <p>连接线</p>
        <Line />
        <p>我是分割线我是分割线</p>
        {/* <p>过滤</p>
        <Filter /> */}
        <p>我是分割线我是分割线</p>
        <p>拖动示例</p>
        <Drag />
      </div>
    );
  }

  ReactDOM.render(<Demo />, MOUNT_NODE);
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
