import React from 'react';

export default class MixinComponent extends React.Component {
  renderItem = (child, index) => {
    const { prefixCls, level, openKeys, selectedKeys, domKeys, onSelect, onOpenChange, mode } = this.props;
    const eventKey = this.props.eventKey || '';
    let newChildProps = {
      prefixCls,
      openKeys,
      selectedKeys,
      domKeys,
      onSelect,
      onOpenChange,
      level: level || 1,
      eventKey: child.key || `${eventKey}-${index}`,
      mode
    }
    return React.cloneElement(child, newChildProps);
  }
}
