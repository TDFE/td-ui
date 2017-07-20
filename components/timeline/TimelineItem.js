/**
 * Created by kongliang on 19/06/2017.
 */
import React from 'react';
import cn from 'classNames';
import s from './style';

export default class TimelineItem extends React.Component {
  static defaultProps = {
    prefixCls: s.timelinePrefix,
    color: 'blue',
    last: false,
    pending: false
  };

  render() {
    const {prefixCls, className, color = '', last, children, pending, dot, ...restProps} = this.props;

    const itemClassName = cn({
      [`${prefixCls}-item`]: true,
      [`${prefixCls}-item-last`]: last,
      [`${prefixCls}-item-pending`]: pending
    }, className);

    const dotClassName = cn({
      [`${prefixCls}-item-head`]: true,
      [`${prefixCls}-item-head-custom`]: dot,
      [`${prefixCls}-item-head-${color}`]: true
    });

    return (
      <li {...restProps} className={itemClassName}>
        <div className={`${prefixCls}-item-tail`}/>
        <div
          className={dotClassName}
          style={{ borderColor: /blue|red|green/.test(color) ? null : color }}
        >
          {dot}
        </div>
        <div className={`${prefixCls}-item-content`}>
          {children}
        </div>
      </li>
    );
  }
}
