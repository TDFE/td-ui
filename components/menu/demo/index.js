import React from 'react';
import ReactDOM from 'react-dom';

/* eslint-disable no-unused-vars */
import Menu from '../index';
import Icon from '../../icon';

const { SubMenu, ItemGroup } = Menu;

const MOUNT_NODE = document.getElementById('app');

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openKeys: ['sub1'],
      selectedKeys: ['1'],
      current: 'mail'
    }
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key
    });
  }

  onOpenChange = (openKeys) => {
    const state = this.state;
    const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
    const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    this.setState({ openKeys: nextOpenKeys });
  }

  getAncestorKeys = (key) => {
    const map = {
      sub3: ['sub2']
    };
    return map[key] || [];
  }

  onSelect = (selectedKeys) => {
    this.setState({
      selectedKeys
    });
  }

  render() {
    return <div>
      <Menu
        style={{ width: 240, marginLeft: 30, marginTop: 30, border: '1px solid #eee' }}
        openKeys={this.state.openKeys}
        onOpenChange={this.onOpenChange}
        selectedKeys={this.state.selectedKeys}
        onSelect={this.onSelect}
      >
        <SubMenu key="sub1" title={<span><Icon type="search" /><span>Navigation One</span></span>}>
          <ItemGroup key="g1" title="Item 1">
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
          </ItemGroup>
          <ItemGroup key="g2" title="Item 2">
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
          </ItemGroup>
        </SubMenu>
        <SubMenu key="sub2" title={<span><Icon type="search" /><span>Navigation Two</span></span>}>
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu key="sub4" title={<span><Icon type="search" /><span>Navigation Three</span></span>}>
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </SubMenu>
      </Menu>

      <Menu
        style={{ position: 'absolute', left: 300, top: 30 }}
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item key="mail">
          <Icon type="search" />Navigation One
        </Menu.Item>
        <SubMenu key="app" title={<span><Icon type="search" /><span>Navigation Two</span></span>}>
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu title={<span><Icon type="search" />Navigation Three - Submenu</span>}>
          <ItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </ItemGroup>
          <ItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </ItemGroup>
        </SubMenu>
        <Menu.Item key="alipay">
          <a href="https://ant.design" target="_blank" rel="noopener noreferrer">Navigation Four - Link</a>
        </Menu.Item>
      </Menu>

      <Menu
        style={{ width: 240, position: 'absolute', left: 300, top: 200, border: '1px solid #eee' }}
        mode="vertical"
      s>
        <SubMenu key="sub1" title={<span><Icon type="search" /><span>Navigation One</span></span>}>
          <ItemGroup title="Item 1">
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
          </ItemGroup>
          <ItemGroup title="Iteom 2">
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
          </ItemGroup>
        </SubMenu>
        <SubMenu key="sub2" title={<span><Icon type="search" /><span>Navigation Two</span></span>}>
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu key="sub4" title={<span><Icon type="search" /><span>Navigation Three</span></span>}>
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </SubMenu>
      </Menu>
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
