/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-05-16 14:49:49
 * @Last modified by:   yzf
 * @Last modified time: 2017-05-16 18:33:09
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col } from '../../grid';

const MOUNT_NODE = document.getElementById('app');

let render = () => {
  let Button = require('../index').default;
  const ButtonGroup = Button.Group;
  function Demo() {
    return (
      <div className="td">
        <Row>
          <Col span={6}><Button type="noborder" icon="search" onClick={() => alert('这是个测试')}>搜索</Button></Col>
          <Col span={6}><Button type="primary" size="large" onClick={() => alert('这是个测试')}>确定</Button></Col>
          <Col span={6}><Button onClick={() => alert('这也是个测试')}>取消</Button></Col>
          <Col span={6}><Button type="dashed" size="small" onClick={() => alert('这也是个测试')}>取消</Button></Col>
        </Row>
        <Row>
          <Col span={12} offset={6}>
            <ButtonGroup>
              <Button style={{marginLeft: 10}} >Cancel</Button>
              <Button type="primary">OK</Button>
            </ButtonGroup>
          </Col>
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
