/**
* @Author: Zhengfeng.Yao <yzf>
* @Date:   2017-06-21 14:26:49
* @Last modified by:   yzf
* @Last modified time: 2017-06-22 09:49:27
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col } from '../../grid';

const MOUNT_NODE = document.getElementById('app');

let render = () => {
  const DatePicker = require('../index').default;
  const RangePicker = DatePicker.RangePicker;

  function Demo() {
    return (
      <div className="td">
        <Row>
          <Col span={8}>
            <DatePicker format="YYYY-MM"/>
          </Col>
          <Col span={8}>
            <DatePicker format="YYYY-MM-DD"/>
          </Col>
          <Col span={8}>
            <DatePicker format="YYYY-MM-DD HH:mm:ss"/>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <RangePicker format="YYYY-MM-DD"/>
          </Col>
        </Row>
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
