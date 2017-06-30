import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import s from './style';

export default class MenuItem extends React.Component {
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

  itemClick = e => {
    e.nativeEvent.stopImmediatePropagation()
    const { eventKey } = this.props;
    this.props.onSelect([eventKey]);
  }

  render() {
    const { prefixCls, children, level, selectedKeys, eventKey, mode } = this.props;
    let style = {};
    if (mode === 'inline') {
      style = {
        paddingLeft: level * 24
      }
    }
    return <li
              className={classnames(`${prefixCls}-item`, {[`${prefixCls}-item-selected`]: selectedKeys.indexOf(eventKey) >= 0})}
              style={style}
              onClick={this.itemClick}
            >{ children }</li>;
  }
}
