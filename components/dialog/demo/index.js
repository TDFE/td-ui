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
      visible: false
    }
  }

  render() {
    return <div>
      <Button style={{marginLeft: 10}} onClick={() => this.setState({visible: true})}>打开弹窗</Button>
      <Dialog
        title="这里是标题"
        onOk={() => this.setState({visible: false})}
        onCancel={() => this.setState({visible: false})}
        visible={this.state.visible}
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
