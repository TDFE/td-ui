import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import s from './style';

export default class SubMenu extends React.Component {
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

  mouseEnter = () => {
    const { openKeys, eventKey, mode } = this.props;
    if (mode !== 'inline') {
      console.log('enter');
      const nextOpenKeys = openKeys.concat([eventKey]);
      this.props.onOpenChange(nextOpenKeys);
    }
  }

  mouseLeave = () => {
    const { openKeys, eventKey, mode } = this.props;
    if (mode !== 'inline') {
      console.log('leave');
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

  renderItem = (child, index) => {
    const { prefixCls, level, openKeys, selectedKeys, onSelect, onOpenChange, mode } = this.props;
    const eventKey = this.props.eventKey || '';
    let newChildProps = {
      prefixCls,
      openKeys,
      selectedKeys,
      onSelect,
      onOpenChange,
      level: level + 1,
      eventKey: child.key || `${eventKey}-sub-${index}`,
      mode
    }
    return React.cloneElement(child, newChildProps);
  }

  render() {
    const { prefixCls, title, children, level, openKeys, eventKey, mode } = this.props;
    let style = {};
    if (mode === 'inline') {
      style = {
        paddingLeft: level * 24
      }
    }
    return <li
      className={`${prefixCls}-submenu`}
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
