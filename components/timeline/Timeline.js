/**
 * Created by kongliang on 19/06/2017.
 */
import React from 'react';
import TimelineItem from './TimelineItem';
import PropTypes from 'prop-types';
import cn from 'classNames';
import s from './style';

export default class Timeline extends React.Component {
  static Item = TimelineItem;
  static defaultProps = {
    prefixCls: s.timelinePrefix
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    /** 指定最后一个幽灵节点是否存在或内容 */
    pending: React.PropTypes.node,
    style: PropTypes.object
  }

  render() {
    const {prefixCls, children, pending, className, ...restProps} = this.props;
    const pendingNode = typeof pending === 'boolean' ? null : pending;
    const classString = cn(prefixCls, {
      [`${prefixCls}-pending`]: !!pending
    }, className);
    const items = React.Children.map(children, (ele:React.ReactElement<any>, idx) =>
      React.cloneElement(ele, {
        last: idx === children.length - 1
      }),
    );
    const pendingItem = (pending) ? (
      <TimelineItem pending={!!pending}>{pendingNode}</TimelineItem>
    ) : null;
    return (
      <ul {...restProps} className={classString}>
        {items}
        {pendingItem}
      </ul>
    );
  }
}
