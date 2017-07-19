/**
 * Created by kongliang on 29/06/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export default class PopupInner extends React.Component {
  static defaultProps = {
    title: ''
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    content: PropTypes.node.isRequired,
    className: PropTypes.string,
    title: PropTypes.node
  }

  render() {
    const {prefixCls, className, content, title, placement, ...restProps} = this.props;

    const popClassName = cn({
      [`${prefixCls}-popup`]: true,
      [`${prefixCls}-placement-${placement}`]: true
    }, className);

    return (
      <div {...restProps} className={popClassName}>
        <div className={`${prefixCls}-arrow`} key="arrow"> </div>
        {title ? <div className={`${prefixCls}-popup-title`}>{title}</div> : ''}
        <div className={`${prefixCls}-popup-content`}>{content}</div>
      </div>
    );
  }
}
