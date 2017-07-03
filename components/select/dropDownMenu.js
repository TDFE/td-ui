/* eslint-disable */
import React, { Component, cloneElement } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import Menu from '../menu';
import scrollIntoView from 'dom-scroll-into-view';
import { getSelectedKeys } from './util';
function toArray(children) {
  const ret = [];
  React.Children.forEach(children, (c) => {
    ret.push(c);
  });
  return ret;
}
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
      console.log(1);
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
    const { menuItems, defaultActiveFirstOption, value, onMenuSelect, prefixCls,inputValue, selectedKeys } = props;
    if (menuItems && menuItems.length) {
      const menuProps = {};
      menuProps.onSelect = onMenuSelect;
      let cloneMenuItems = menuItems;
      const activeKeyProps = {};
      if (selectedKeys.length) {
        if (props.visible && !this.lastVisible) {
          activeKeyProps.activeKey = selectedKeys[0];
        }
        let foundFirst = false;
        const clone = item => {
          if (!foundFirst && selectedKeys.indexOf(item.key) !== -1) {
            foundFirst = true;
            return cloneElement(item, {
              ref: ref => {
                this.firstActiveItem = ref;
              }
            })
          }
          return item;
        }
        cloneMenuItems = menuItems.map(item => {
          if (item.type.displayName === 'ItemGroup') {
            const children = toArray(item.props.children).map(clone);
            return cloneElement(item, {}, children);
          }
          return clone(item);
        })
      }
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
