/**
 * Created by therfaint- on 21/06/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import s from './style';
import cn from 'classNames';

export default class Switch extends React.Component {
  static defaultProps = {
    defaultChecked: false,
    prefixCls: s.switchPrefix
  }
  static propTypes = {
    size: PropTypes.oneOf(['default', 'small']),
    onChange: PropTypes.func,
    checkedChildren: PropTypes.string,
    unCheckedChildren: PropTypes.string
  }
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    }
  }
  handleClick = () => {
    this.setState({
      checked: !this.state.checked
    })
    this.props.onChange(!this.state.checked);
  }
  render() {
    const {
      size, prefixCls, className
    } = this.props;
    const { checked } = this.state;
    let sizeCls = '';
    switch (size) {
      case 'small':
        sizeCls = 'small';
        break;
      default:
        break;
    }
    const switchCls = cn(prefixCls, {
      [`${prefixCls}-${sizeCls}`]: sizeCls,
      [`${prefixCls}-${sizeCls}-checked`]: sizeCls && checked,
      [`${prefixCls}-checked`]: !sizeCls && checked
    }, className)
    const tdSwitchBtn = 'td-switch-button';
    const btnCls = cn(tdSwitchBtn, {
      [`${tdSwitchBtn}-${sizeCls}`]: sizeCls,
      [`${tdSwitchBtn}-${sizeCls}-on`]: checked && sizeCls,
      [`${tdSwitchBtn}-on`]: !sizeCls && checked
    }, className)
    return (
      <span className={switchCls} onClick={this.handleClick}>
        <div className={btnCls}></div>
        {
          this.props.checkedChildren
            ? <div className="td-child-check" style={this.state.checked ? {opacity: 1} : {opacity: 0}}>{this.props.checkedChildren}</div> : null
        }
        {
          this.props.unCheckedChildren
            ? <div className="td-child-uncheck" style={this.state.checked ? {opacity: 0} : {opacity: 1}}>{this.props.unCheckedChildren}</div> : null
        }
      </span>
    )
  }
}
