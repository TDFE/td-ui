/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-06-15 15:30:38
 * @Last modified by:   yzf
 * @Last modified time: 2017-06-19 15:11:09
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Form from '../index';
import Input from '../../input';
import Button from '../../button';

const FormItem = Form.Item;
const FormControl = Form.Control;

const MOUNT_NODE = document.getElementById('app');

@Form.create()
class Demo extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          <FormControl name="userName" rules={[{ required: true, message: '请输入用户名!' }]}>
            <Input placeholder="请输入..."/>
          </FormControl>
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">
            确定
          </Button>
        </FormItem>
      </Form>
    );
  }
}

let render = () => {
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
