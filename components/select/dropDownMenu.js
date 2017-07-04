import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Menu from '../menu';
import scrollIntoView from 'dom-scroll-into-view';

export default class DropdownMenu extends Component {
  componentWillMount() {
    this.lastInputValue = this.props.inputValue;
  }
  componentDidMount() {
    this.scrollActiveItemtoView();
    this.lastVisible = this.props.visible;
  }
  shouldComponentUpdate(nextProps) {
    if (!nextProps.visible) {
      this.lastVisible = false;
    }
    return nextProps.visible;
  }
  componentDidUpdate(prevProps) {
    const props = this.props;
    if (!prevProps.visible && props.visible) {
      this.scrollActiveItemtoView();
    }
    this.lastVisible = props.visible;
    this.lastInputValue = props.inputValue;
  }
  scrollActiveItemtoView = () => {
    const itemComponent = findDOMNode(this.firstActiveItem);
    if (itemComponent) {
      scrollIntoView(itemComponent, findDOMNode(this.refs.menu, {
        onlyScrollIfNeeded: true
      }))
    }
  }
  renderMenu() {
    const props = this.props;
    const { menuItems, prefixCls, onMenuSelect, selectedKeys } = props;
    if (menuItems && menuItems.length) {
      const menuProps = {};
      menuProps.onSelect = onMenuSelect;
      let cloneMenuItems = menuItems;
      return (
        <Menu {...menuProps} ref='menu' selectedKeys={selectedKeys} prefixCls={`${prefixCls}-menu`}>{cloneMenuItems}</Menu>
      )
    }
    return null;
  }
  render() {
    const renderMenu = this.renderMenu();
    return renderMenu ? (
      <div style={{overflow: 'auto'}}>{renderMenu}</div>
    ) : null
  }
}

DropdownMenu.displayName = 'DropdownMenu';
