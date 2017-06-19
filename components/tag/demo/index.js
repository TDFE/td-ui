/**
 * @Author: Yingxi.Hao
 * @Date:   2017-06-14
 * @Last modified by:   hyx
 * @Last modified time: 2017-06-16
 */
import React from 'react';
import ReactDOM from 'react-dom';

const MOUNT_NODE = document.getElementById('app');

let render = () => {
  let Tag = require('../index').default;
  let CheckableTag = Tag.CheckableTag;
  class CheckableDemo extends React.Component {
    state={
      checked: true
    };
    handleChange = (checked) => {
      this.setState({
        checked: checked
      });
    };
    render() {
      return (
        <CheckableTag {...this.props} onChange={this.handleChange} checked={this.state.checked}></CheckableTag>
      );
    }
  }
  class Demo extends React.Component {
    render() {
      return <Tag {...this.props}></Tag>
    }
  }

  ReactDOM.render(
    <div>
      <div>
        <p>This is a checkableTag Demo.When you click it,it will change checked state.</p>
        <CheckableDemo>tag1</CheckableDemo>
        <CheckableDemo>tag2</CheckableDemo>
        <CheckableDemo>tag3</CheckableDemo>
        <p>This is a normal Demo.It can be closed and can be set a color.</p>
        <Demo closable={true} color="pink">test</Demo>
        <Demo color="red">test</Demo>
        <Demo closable={true}>test</Demo>
        <Demo closable={true}>test</Demo>
      </div>
  </div>,
    MOUNT_NODE);
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
