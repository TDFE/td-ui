/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-07-03 16:37:08
 * @Last modified by:   yzf
 * @Last modified time: 2017-07-04 11:37:30
 */
/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col } from '../../grid';

const MOUNT_NODE = document.getElementById('app');

let render = () => {
  let Table = require('../index').default;
  const Column = Table.Column;
  function Demo() {
    return (
      <div className="td">
        <Row>
          <Col span={12}></Col>
          <Col span={12}></Col>
        </Row>
        <Row>
          <Col span={12}></Col>
          <Col span={12}></Col>
        </Row>
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
