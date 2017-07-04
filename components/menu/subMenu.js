import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import s from './style';
import { checkSelected } from './util';
import MixinComponent from './mixinComponent';

export default class SubMenu extends MixinComponent {
  static defaultProps = {
    prefixCls: s.menuPrefix,
    title: '',
    children: ''
  }

  static propTypes = {
    prefixCls: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
  }

  constructor (props) {
    super(props);
    this.num = 1;
  }

  mouseEnter = () => {
    const { openKeys, eventKey, mode } = this.props;
    if (mode !== 'inline') {
      const nextOpenKeys = openKeys.concat([eventKey]);
      this.props.onOpenChange(nextOpenKeys);
    }
  }

  mouseLeave = () => {
    const { openKeys, eventKey, mode } = this.props;
    if (mode !== 'inline') {
      const index = openKeys.indexOf(eventKey);
      if (index >= 0) {
        openKeys.splice(index, 1);
      }
      this.props.onOpenChange(openKeys);
    }
  }

  submenuClick = () => {
    const { openKeys, eventKey } = this.props;
    const index = openKeys.indexOf(eventKey);
    let nextOpenKeys = [];
    if (index >= 0) {
      openKeys.splice(index, 1);
      nextOpenKeys = openKeys
    } else {
      nextOpenKeys = openKeys.concat([eventKey]);
    }
    this.props.onOpenChange(nextOpenKeys);
  }

  render() {
    const { prefixCls, title, children, level, openKeys, eventKey, mode, selectedKeys, domKeys } = this.props;
    let style = {};
    if (mode === 'inline') {
      style = {
        paddingLeft: level * 24
      }
    }
    return <li
      className={classnames(`${prefixCls}-submenu`, {
        [`${prefixCls}-submenu-child-selected`]: checkSelected(domKeys, selectedKeys, eventKey),
        [`${prefixCls}-submenu-child-open`]: openKeys.indexOf(eventKey) >= 0
      })}
      onMouseEnter={this.mouseEnter}
      onMouseLeave={this.mouseLeave}
    >
      <div className={`${prefixCls}-submenu-title`} style={style} onClick={this.submenuClick}>{ title }</div>
      <ul className={classnames(prefixCls, {
        [`${prefixCls}-submenu-hidden`]: openKeys.indexOf(eventKey) < 0,
        [`${prefixCls}-vertical`]: mode === 'horizontal'
      })}>
        { React.Children.map(children, this.renderItem) }
      </ul>
    </li>;
  }
}

// module.exports = mixin(SubMenu)
