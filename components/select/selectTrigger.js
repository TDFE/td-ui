import Trigger from 'rc-trigger';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';
import cn from 'classnames';
import DropdownMenu from './dropdownMenu';

const BUILT_IN_PLACEMENTS = {
  bottomLeft: {
    points: ['tl', 'bl'],
    offset: [0, 4],
    overflow: {
      adjustX: 0,
      adjustY: 1
    }
  },
  topLeft: {
    points: ['bl', 'tl'],
    offset: [0, -4],
    overflow: {
      adjustX: 0,
      adjustY: 1
    }
  }
}

export default class SelectTrigger extends Component {
  getDropdownElement = newProps => {
    const props = this.props;
    return (
      <DropdownMenu {...newProps}
        prefixCls={this.getDropdownPrefixCls()}
        onMenuSelect={props.onMenuSelect}
        defaultActiveFirstOption={props.defaultActiveFirstOption}
        dropdownMenuStyle={props.dropdownMenuStyle}
        selectedKeys={props.selectedKeys}
        multiple={props.multiple}
      />
    )
  }
  getDropdownPrefixCls = () => {
    return `${this.props.prefixCls}-dropdown`;
  }
  componentDidUpdate() {
    const { visible, dropdownMatchSelectWidth } = this.props;
    if (visible) {
      const dropdownDOMNode = this.getPopupDOMNode();
      if (dropdownDOMNode) {
        const widthProp = dropdownMatchSelectWidth ? 'width' : 'minWidth';
        dropdownDOMNode.style[widthProp] = `${ReactDOM.findDOMNode(this).offsetWidth}px`;
      }
    }
  }
  getPopupDOMNode = () => {
    return this.refs.trigger.getPopupDomNode();
  }
  render() {
    const props = this.props;
    const { visible, inputValue, options, onPopupFocus, disabled, dropdownClassName, multiple } = props;
    const popupElement = this.getDropdownElement({
      multiple,
      inputValue,
      visible,
      menuItems: options,
      onPopupFocus
    });
    const dropdownPrefixCls = this.getDropdownPrefixCls();
    const popupClassName = {
      [dropdownClassName]: !!dropdownClassName,
      [`${dropdownPrefixCls}-${multiple ? 'multiple' : 'single'}`]: true
    }
    let hideAction;
    if (disabled) {
      hideAction = [];
    } else {
      hideAction = ['click'];
    }
    return (
      <Trigger ref='trigger'
        popupPlacement='bottomLeft'
        popup={popupElement}
        popupVisible={visible}
        getPopupContainer={props.getPopupContainer}
        prefixCls={dropdownPrefixCls}
        popupClassName={cn(popupClassName)}
        builtinPlacements={BUILT_IN_PLACEMENTS}
        showAction={disabled ? [] : ['click']}
        hideAction={hideAction}
      >
        {props.children}
      </Trigger>
    )
  }
}
