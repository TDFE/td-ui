/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-05-22 11:41:32
 * @Last modified by:   yzf
 * @Last modified time: 2017-05-22 11:41:34
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classNames';
import omit from 'lodash/omit';
import s from './style';
import is from '../util/is';
/* eslint-disable no-unused-vars */
import Icon from '../icon';

const TWO_CN_REX = /^[\u4e00-\u9fa5]{2}$/;

// 如果是两个中文字符，则在中间插入一个空格
function insertSpace(child, needInserted) {
  if (is.nil(child)) {
    return;
  }
  const SPACE = needInserted ? ' ' : '';
  if (!is.String(child) && !is.Number(child) && is.String(child.type) && TWO_CN_REX.test(child.props.children)) {
    return React.cloneElement(child, {}, child.props.children.split('').join(SPACE));
  }
  if (is.String(child)) {
    if (TWO_CN_REX.test(child)) {
      child = child.split('').join(SPACE);
    }
    return <span>{child}</span>;
  }
  return child;
}

export default class Button extends Component {
  static defaultProps = {
    prefixCls: s.btnPrefix,
    loading: false,
    clicked: false
  }

  static propTypes = {
    type: PropTypes.string,
    size: PropTypes.oneOf(['large', 'default', 'small']),
    htmlType: PropTypes.oneOf(['submit', 'button', 'reset']),
    onClick: PropTypes.func,
    loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    className: PropTypes.string,
    style: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: props.loading
    };
  }

  handleClick = e => {
    this.setState({ clicked: true });
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.setState({ clicked: false }), 500);

    const onClick = this.props.onClick;
    if (onClick) {
      onClick(e);
    }
  }

  handleMouseUp = e => {
    if (this.props.onMouseUp) {
      this.props.onMouseUp(e);
    }
  }

  render() {
    const {
      type, size = '', className, style, htmlType, children, icon, prefixCls, ...others
    } = this.props;

    const { loading, clicked } = this.state;

    // large => lg
    // small => sm
    let sizeCls = '';
    switch (size) {
      case 'large':
        sizeCls = 'lg';
        break;
      case 'small':
        sizeCls = 'sm';
        break;
      default:
        break;
    }

    const st = Object.assign({}, style);
    const classNames = cn(prefixCls, {
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-${sizeCls}`]: sizeCls,
      [`${prefixCls}-loading`]: loading,
      [`${prefixCls}-clicked`]: clicked
    }, className);

    const iconType = loading ? 'loading' : icon;
    const iconNode = iconType ? <Icon type={iconType} /> : null;
    const needInserted = React.Children.count(children) === 1;
    const kids = React.Children.map(children, child => insertSpace(child, needInserted));

    return (
      <button
        {...omit(others, ['loading', 'clicked'])}
        type={htmlType || 'button'}
        className={classNames}
        style={st}
        onMouseUp={this.handleMouseUp}
        onClick={this.handleClick}
        >
        {iconNode}{kids}
      </button>
    );
  }
}
