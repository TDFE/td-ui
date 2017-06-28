/**
 * Created by sunxianxiong on 17/6/28.
 */
/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import Checkbox from '../index';

const MOUNT_NODE = document.getElementById('app');

class Demo extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      checked:true
    };
  }

  onChange = e => {
    this.setState({ checked: e.target.checked });
  }

  render() {
    return (
      <div className="td">
        <div><Checkbox>Checkbox</Checkbox></div>
        <div><Checkbox checked = {this.state.checked} onChange={this.onChange}>Checkbox</Checkbox></div>
        <div><Checkbox checked={false}>Checkbox</Checkbox></div>
        <div><Checkbox defaultChecked={true}>Checkbox</Checkbox></div>
        <div><Checkbox defaultChecked={false}>Checkbox</Checkbox></div>
        <div><Checkbox checked defaultChecked={false}>Checkbox</Checkbox></div>
        <div><Checkbox disabled>Checkbox</Checkbox></div>
        <div><Checkbox disabled checked={true}>Checkbox</Checkbox></div>
        <div><Checkbox indeterminate={true}>Checkbox</Checkbox></div>
      </div>
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