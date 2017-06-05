/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-05-16 14:49:49
 * @Last modified by:   yzf
 * @Last modified time: 2017-05-16 18:33:09
 */

/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';

const MOUNT_NODE = document.getElementById('app');

let render = () => {
  /* eslint-disable no-unused-vars */
  let Button = require('../index').default;

  /* eslint-disable no-unused-vars */
  function Demo() {
    return (
      <div className="td">
        <Button type="primary" icon="search" onClick={() => alert('这是个测试')}>搜索</Button>
        <Button type="primary" style={{marginLeft: 10}} size="large" onClick={() => alert('这是个测试')}>确定</Button>
        <Button style={{marginLeft: 10}} onClick={() => alert('这也是个测试')}>取消</Button>
        <Button type="dashed" style={{marginLeft: 10}} size="small" onClick={() => alert('这也是个测试')}>取消</Button>
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
