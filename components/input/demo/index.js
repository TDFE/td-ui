/**
 * @Author:  GinaLu <ljq>
 * @Date:   2017-05-16 14:49:49
 * @Last modified by:   ljq
 * @Last modified time: 2017-05-16 18:33:09
 */

/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';

const MOUNT_NODE = document.getElementById('app');

let render = () => {
  /* eslint-disable no-unused-vars */
  let Input = require('../index').default;
  let Search = Input.Search;
  /* eslint-disable no-unused-vars */
  function Demo() {
    return (
      <div className="td">
      正常demo

        <Input placeholder="gina" disabled/>

        前置后置标签
        <Input placeholder="gina" addonBefore="我是名字"/>
        <Input placeholder="124x" addonAfter="元"/>
        <Input defaultValue="123456" addonAfter="元" id="number"/>

        尺寸demo
        <Input placeholder="large size" size="large"/>
        <Input placeholder="small size" size="small"/>


        搜索输入框
         <Search placeholder="input search text" style={{ width: 200 }} onSearch={value => console.log(value)}/>
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
