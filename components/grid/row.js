/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-06-13 17:53:01
 * @Last modified by:   yzf
 * @Last modified time: 2017-06-13 17:53:02
 */

import React, { Children, cloneElement, Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import s from './style';

export default class Row extends Component {
  static defaultProps = {
    gutter: 0
  };

  static propTypes = {
    type: PropTypes.string,
    align: PropTypes.string,
    justify: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
    gutter: PropTypes.number,
    prefixCls: PropTypes.string
  };
  render() {
    const { type, justify, align, className, gutter, style, children,
      prefixCls = s.rowPrefix, ...others } = this.props;
    const classes = classNames({
      [prefixCls]: !type,
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-${type}-${justify}`]: type && justify,
      [`${prefixCls}-${type}-${align}`]: type && align
    }, className);
    const rowStyle = gutter > 0 ? Object.assign({}, {
      marginLeft: gutter / -2,
      marginRight: gutter / -2
    }, style) : style;
    const cols = Children.map(children, col => {
      if (!col) {
        return null;
      }
      if (col.props && gutter > 0) {
        return cloneElement(col, {
          style: Object.assign({}, {
            paddingLeft: gutter / 2,
            paddingRight: gutter / 2
          }, col.props.style)
        });
      }
      return col;
    });
    return <div {...others} className={classes} style={rowStyle}>{cols}</div>;
  }
}
