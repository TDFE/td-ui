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
import Icon from '../../icon';

const MOUNT_NODE = document.getElementById('app');

function renderBasic() {
  let Table = require('../index').default;
  const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="#">{text}</a>,
  }, {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  }, {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a href="#">Action 一 {record.name}</a>
        <span className="td-divider" />
        <a href="#">Delete</a>
        <span className="td-divider" />
        <a href="#" className="td-dropdown-link">
          More actions <Icon type="unfold" />
        </a>
      </span>
    ),
  }];

  const data = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  }, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  }, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  }];
  return <Table columns={columns} dataSource={data} />;
}

let render = () => {
  function Demo() {
    return (
      <div className="td">
        <Row>
          <Col span={12}>
            {renderBasic()}
          </Col>
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
