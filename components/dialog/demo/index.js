import React from 'react';
import ReactDOM from 'react-dom';

/* eslint-disable no-unused-vars */
import Button from '../../button/index';
/* eslint-disable no-unused-vars */
import Dialog from '../index';

const MOUNT_NODE = document.getElementById('app');

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      visible2: false
    }
  }

  onConfirm = () => {
    Dialog.confirm({
      title: '你确认这个是xxx?',
      content: '确认之后我们会关闭此弹出框，请xxxx'
    });
  }

  onSuccess = () => {
    Dialog.success({
      title: '你确认这个是xxx?',
      content: '确认之后我们会关闭此弹出框，请xxxx'
    });
  }

  onError = () => {
    Dialog.error({
      title: '你确认这个是xxx?',
      content: '确认之后我们会关闭此弹出框，请xxxx'
    });
  }

  onWarning = () => {
    Dialog.warning({
      title: '你确认这个是xxx?',
      content: '确认之后我们会关闭此弹出框，请xxxx'
    });
  }

  render() {
    return <div>
      <Button style={{marginLeft: 10}} onClick={() => this.setState({visible: true})}>打开弹窗</Button>
      <Button style={{marginLeft: 10}} onClick={() => this.setState({visible2: true})}>弹窗-自定义footer</Button>
      <Button style={{marginLeft: 10}} onClick={ this.onConfirm }>confirm</Button>
      <Button style={{marginLeft: 10}} onClick={ this.onSuccess }>success</Button>
      <Button style={{marginLeft: 10}} onClick={ this.onError }>error</Button>
      <Button style={{marginLeft: 10}} onClick={ this.onWarning }>warning</Button>
      <Dialog
        title="这里是标题"
        onOk={() => this.setState({visible: false})}
        onCancel={() => this.setState({visible: false})}
        visible={this.state.visible}
        okText="确定-ok"
        cancelText="取消-cancel"
        maskClosable={false}
      >
        <p>这里是弹窗内容</p>
        <p>这里是弹窗内容</p>
        <p>这里是弹窗内容</p>
      </Dialog>
      <Dialog
        title="弹窗-自定义footer"
        onOk={() => this.setState({visible2: false})}
        onCancel={() => this.setState({visible2: false})}
        visible={this.state.visible2}
        footer="xx"
        width="400px"
      >
        <p>这里是弹窗内容</p>
        <p>这里是弹窗内容</p>
        <p>这里是弹窗内容</p>
      </Dialog>
    </div>
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
