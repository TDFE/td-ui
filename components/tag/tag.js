/**
 * @Author: Yingxi.Hao
 * @Date:   2017-06-15
 * @Last modified time: 2017-06-15
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'lodash/omit';
import assign from 'object-assign';
import Icon from '../icon';
import CheckableTag from './checkableTag';
import s from './style';
class Tag extends Component {
  static CheckableTag = CheckableTag;
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    color: PropTypes.string,
    // 标签是否可以关闭
    closable: PropTypes.bool,
    // 关闭时的回调
    onClose: PropTypes.func,
    // 动画关闭后的回调
    afterClose: PropTypes.func
  };
  static defaultProps = {
    prefixCls: s.tagPrefix,
    closable: false
  };
  state = {
    closed: false
  };
  close = (e) => {
    const onClose = this.props.onClose;
    if (onClose) {
      onClose(e);
    }
    if (e.defaultPrevented) {
      return;
    }
    this.setState({
      closed: true
    })
  };
  isPresetColor(color) {
    return /^(pink|red|yellow|orange|cyan|green|blue|purple)(-inverse)?$/.test(color);
  }
  render() {
    const {prefixCls, closable, color, className, children, style, ...otherProps} = this.props;
    const closeIcon = closable ? <Icon type="cross" onClick={this.close}/> : '';
    const isPresetColor = this.isPresetColor(color);
    const classString = classNames(prefixCls, {
      [`${prefixCls}-${color}`]: isPresetColor,
      [`${prefixCls}-has-color`]: (color && !isPresetColor)
    }, className);
    const divProps = omit(otherProps, [
      'onClose'
    ]);
    const tagStyle = assign({
      backgroundColor: (color && !isPresetColor) ? color : null
    }, style);
    const tag = this.state.closed ? null : (
      <div {...divProps} className={classString} style={tagStyle}>
        <span className={`${prefixCls}-text`}>{children}</span>
        {closeIcon}
      </div>
    );
    return (
      <div className={s.wrapper}>
      {tag}
      </div>
    )
  }
}
export default Tag;
