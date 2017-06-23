/**
* @Author: Zhengfeng.Yao <yzf>
* @Date:   2017-06-21 14:26:49
* @Last modified by:   yzf
* @Last modified time: 2017-06-22 09:49:27
*/

import React from 'react';
import ReactDOM from 'react-dom';

const MOUNT_NODE = document.getElementById('app');

let render = () => {
  const DatePicker = require('../index').default;

  function Demo() {
    return (
      <div className="td">
        <DatePicker />
      </div>
    );
  }

  ReactDOM.render(
    <Demo />,
    MOUNT_NODE
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
    });
  });
}
