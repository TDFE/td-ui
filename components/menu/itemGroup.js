import React from 'react';
import PropTypes from 'prop-types';
import s from './style';

export default class ItemGroup extends React.Component {
  static defaultProps = {
    prefixCls: s.menuPrefix,
    title: '',
    children: ''
  }

  static propTypes = {
    prefixCls: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
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
      level: level || 1,
      eventKey: child.key || `${eventKey}-group-${index}`,
      mode
    }
    return React.cloneElement(child, newChildProps);
  }

  render() {
    const { prefixCls, title, children, level, mode } = this.props;
    let style = {};
    if (mode === 'inline') {
      style = {
        paddingLeft: level * 24 - 12
      }
    }
    return <li className={`${prefixCls}-item-group`}>
      <div className={`${prefixCls}-item-group-title`} style={style}>{ title }</div>
      <ul className={`${prefixCls}-item-group-list`}>
        { React.Children.map(children, this.renderItem) }
      </ul>
    </li>;
  }
}
