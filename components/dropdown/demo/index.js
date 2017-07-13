import React from 'react';
import ReactDOM from 'react-dom';

/* eslint-disable no-unused-vars */
import Dropdown from '../index';
import Button from '../../button';
import Icon from '../../icon';
import Menu from '../../Menu';

const { SubMenu, Item } = Menu;

const MOUNT_NODE = document.getElementById('app');

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    }
  }

  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          1st menu item xxx
        </Menu.Item>
        <Menu.Item>
          2st menu item xxx
        </Menu.Item>
        <Menu.Item>
          3st menu item xxx
        </Menu.Item>
      </Menu>
    )
    const menu2 = (
      <Menu>
        <Menu.Item>
          1st menu item xxx
        </Menu.Item>
        <Menu.Item>
          2st menu item xxx
        </Menu.Item>
        <SubMenu key="sub3" title="Submenu">
          <Menu.Item key="7">Option 7</Menu.Item>
          <Menu.Item key="8">Option 8</Menu.Item>
        </SubMenu>
      </Menu>
    )
    return <div>
      <div style={{margin: 30}}>
        <Dropdown overlay={menu} visible={this.state.visible} onVisibleChange={(b) => {
          console.log(b);
          this.setState({
            visible: b
          });
        }}>
          <Button>按钮按钮</Button>
        </Dropdown>
      </div>
      <div style={{position: 'absolute', top: 30, left: 250}}>
        <Dropdown overlay={menu} trigger="click">
          <Button>按钮click</Button>
        </Dropdown>
      </div>

      <div style={{position: 'absolute', top: 30, left: 500}}>
        <Dropdown overlay={menu2}>
          <Button>按钮二级</Button>
        </Dropdown>
      </div>

      <div style={{position: 'absolute', top: 200, left: 100}}>
        <Dropdown overlay={menu} placement="bottomLeft">
          <Button>bottomLeft</Button>
        </Dropdown>
      </div>
      <div style={{position: 'absolute', top: 200, left: 300}}>
        <Dropdown overlay={menu} placement="bottomRight">
          <Button>bottomRight</Button>
        </Dropdown>
      </div>
      <div style={{position: 'absolute', top: 200, left: 500}}>
        <Dropdown overlay={menu} placement="bottomCenter">
          <Button>bottomCenter</Button>
        </Dropdown>
      </div>
      <div style={{position: 'absolute', top: 400, left: 100}}>
        <Dropdown overlay={menu} placement="topLeft">
          <Button>topLeft</Button>
        </Dropdown>
      </div>
      <div style={{position: 'absolute', top: 400, left: 300}}>
        <Dropdown overlay={menu} placement="topRight">
          <Button>topRight</Button>
        </Dropdown>
      </div>
      <div style={{position: 'absolute', top: 400, left: 500}}>
        <Dropdown overlay={menu} placement="topCenter">
          <Button>topCenter</Button>
        </Dropdown>
      </div>
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
