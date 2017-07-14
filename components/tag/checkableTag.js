/**
 * @Author: Yingxi.Hao
 * @Date:   2017-06-13
 * @Last modified time: 2017-06-15
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import s from './style';

class CheckableTag extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func
  };
  defaultProps = {
    prefixCls: s.tagPrefix,
    checked: false,
    onChange: (checked) => {}
  };
  handleClick = () => {
    const {checked, onChange} = this.props;
    if (onChange) {
      onChange(!checked);
    }
  }
  render() {
    const {prefixCls = 'td-tag', className, checked, ...restProps} = this.props;
    const cls = classNames(prefixCls, {
      [`${prefixCls}-checkable`]: true,
      [`${prefixCls}-checkable-checked`]: checked
    }, className);
    delete (restProps).onChange;
    return (
      <div {...restProps} className={cls} onClick={this.handleClick}></div>
    );
  }
}
export default CheckableTag;
