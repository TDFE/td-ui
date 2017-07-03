/**
 * Created by kongliang on 19/06/2017.
 */
import React from 'react';
import TimelineItem from './TimelineItem';
import cn from 'classnames';
import s from './style';

export default class Timeline extends React.Component {
  static Item = TimelineItem;
  static defaultProps = {
    prefixCls: s.timelinePrefix
  };

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
