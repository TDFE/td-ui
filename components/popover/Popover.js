/**
 * Created by kongliang on 05/07/2017.
 */
import React from 'react';
import assign from 'object-assign';
import Tooltip from '../tooltip';
import s from './style';

export default class Popover extends React.Component {
  static defaultProps = {
    prefixCls: s.tooltipPrefix,
    placement: 'top'
  };
  render() {
    const props = assign({}, this.props);
    delete props.title;
    return (
      <Tooltip
        {...props}
      />
    );
  }
}
