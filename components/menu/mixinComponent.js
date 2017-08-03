import React from 'react';

export default class MixinComponent extends React.Component {
  renderItem = (child, index) => {
    const { prefixCls, level, openKeys, selectedKeys, domKeys, onSelect, onOpenChange, mode, multiple } = this.props;
    const eventKey = this.props.eventKey || '';
    let newChildProps = {
      prefixCls,
      openKeys,
      selectedKeys,
      domKeys,
      onSelect,
      onOpenChange,
      level: level ? (level + this.num) : 1,
      eventKey: child.key || `${eventKey}-${index}`,
      mode,
      multiple,
      disabled: child.props.disabled || false
    }
    return React.cloneElement(child, newChildProps);
  }
}
