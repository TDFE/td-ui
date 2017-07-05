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
import Button from '../../button';

const MOUNT_NODE = document.getElementById('app');

function renderBasic(Table) {
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

function renderJSX(Table) {
  const { Column, ColumnGroup } = Table;

  const data = [{
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  }, {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  }, {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  }];
  return (
    <Table dataSource={data}>
      <ColumnGroup title="Name">
        <Column
          title="First Name"
          dataIndex="firstName"
          key="firstName"
        />
        <Column
          title="Last Name"
          dataIndex="lastName"
          key="lastName"
        />
      </ColumnGroup>
      <Column
        title="Age"
        dataIndex="age"
        key="age"
      />
      <Column
        title="Address"
        dataIndex="address"
        key="address"
      />
      <Column
        title="Action"
        key="action"
        render={(text, record) => (
          <span>
            <a href="#">Action 一 {record.name}</a>
            <span className="td-divider" />
            <a href="#">Delete</a>
            <span className="td-divider" />
            <a href="#" className="td-dropdown-link">
              More actions <Icon type="unfold" />
            </a>
          </span>
        )}
      />
    </Table>
  );
}

function renderSelectAndBordered(Table) {
  const columns = [{
    title: 'Name',
    dataIndex: 'name',
    render: text => <a href="#">{text}</a>,
  }, {
    title: 'Age',
    dataIndex: 'age',
  }, {
    title: 'Address',
    dataIndex: 'address',
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
  }, {
    key: '4',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
  }];

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User',    // Column configuration not to be checked
    }),
  };
  return <Table rowSelection={rowSelection} columns={columns} dataSource={data} bordered/>;
}

function renderSortAndFilter(Table) {
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
  }, {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  }];

  const App = class extends React.Component {
    state = {
      filteredInfo: null,
      sortedInfo: null,
    };
    handleChange = (pagination, filters, sorter) => {
      console.log('Various parameters', pagination, filters, sorter);
      this.setState({
        filteredInfo: filters,
        sortedInfo: sorter,
      });
    }
    clearFilters = () => {
      this.setState({ filteredInfo: null });
    }
    clearAll = () => {
      this.setState({
        filteredInfo: null,
        sortedInfo: null,
      });
    }
    setAgeSort = () => {
      this.setState({
        sortedInfo: {
          order: 'descend',
          columnKey: 'age',
        },
      });
    }
    render() {
      let { sortedInfo, filteredInfo } = this.state;
      sortedInfo = sortedInfo || {};
      filteredInfo = filteredInfo || {};
      const columns = [{
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        filters: [
          { text: 'Joe', value: 'Joe' },
          { text: 'Jim', value: 'Jim' },
        ],
        filteredValue: filteredInfo.name || null,
        onFilter: (value, record) => record.name.includes(value),
        sorter: (a, b) => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
      }, {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        sorter: (a, b) => a.age - b.age,
        sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
      }, {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        filters: [
          { text: 'London', value: 'London' },
          { text: 'New York', value: 'New York' },
        ],
        filteredValue: filteredInfo.address || null,
        onFilter: (value, record) => record.address.includes(value),
        sorter: (a, b) => a.address.length - b.address.length,
        sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
      }];
      return (
        <div>
          <div className="table-operations">
            <Button onClick={this.setAgeSort}>Sort age</Button>
            <Button onClick={this.clearFilters}>Clear filters</Button>
            <Button onClick={this.clearAll}>Clear filters and sorters</Button>
          </div>
          <Table columns={columns} dataSource={data} onChange={this.handleChange} bordered/>
        </div>
      );
    }
  }

  return <App />;
}

let render = () => {
  let Table = require('../index').default;
  function Demo() {
    const style = { padding: 5 };
    return (
      <div className="td">
        <Row>
          <Col span={11} style={style}>
            {renderBasic(Table)}
          </Col>
          <Col span={11} style={style}>
            {renderJSX(Table)}
          </Col>
        </Row>
        <Row>
          <Col span={11} style={style}>
            {renderSelectAndBordered(Table)}
          </Col>
          <Col span={11} style={style}>
            {renderSortAndFilter(Table)}
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
