/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import Basic from './basic';
import More from './more';
import ChangeSize from './changeSize';
import Jumper from './jumper';
import Small from './small';
import Control from './control';
import Total from './total';
import Num from './num';
const MOUNT_NODE = document.getElementById('app');

let render = () => {
  /* eslint-disable no-unused-vars */
  let Pagination = require('../index').default;

  /* eslint-disable no-unused-vars */
  function Demo() {
    return (
      <div className="td">
        <p>基础分页</p>
        <Basic />
        <p>我是分割线我是分割线我是分割线我是分割线我是分割线我是分割线</p>
        <p>更多分页</p>
        <More />
        <p>我是分割线我是分割线我是分割线我是分割线我是分割线我是分割线</p>
        <p>改变每页显示条目数</p>
        <ChangeSize />
        <p>我是分割线我是分割线我是分割线我是分割线我是分割线我是分割线</p>
        <p>快速跳转到某一页</p>
        <Jumper />
        <p>我是分割线我是分割线我是分割线我是分割线我是分割线我是分割线</p>
        <p>迷你版本</p>
        <Small />
        <p>我是分割线我是分割线我是分割线我是分割线我是分割线我是分割线</p>
        <p>受控制的页码</p>
        <Control />
        <p>我是分割线我是分割线我是分割线我是分割线我是分割线我是分割线</p>
        <p>总数</p>
        <Total />
        <p>我是分割线我是分割线我是分割线我是分割线我是分割线我是分割线</p>
        <Num />
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
