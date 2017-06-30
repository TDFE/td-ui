import React from 'react';
import ReactDOM from 'react-dom';
import Upload from '../index';
const MOUNT_NODE = document.getElementById('app');

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: ''
    }
  }
  handleChange = file => {
    this.setState({
      fileList: file
    })
  }
  handleClick = () => {
    console.log(this.state.fileList);
  }
  render() {
    return (
      <div>
        <Upload accept='xls' note='abcdabcdabcd' fileList={this.state.fileList} onChange={this.handleChange}/>
        <div onClick={this.handleClick}>点击获得fileList</div>
      </div>
    )
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
