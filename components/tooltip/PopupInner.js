/**
 * Created by kongliang on 29/06/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classNames';

export default class PopupInner extends React.Component {
  static defaultProps = {
    // prefixCls: s.timelinePrefix,
    title: ''
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    content: React.PropTypes.node.isRequired,
    className: PropTypes.string,
    title: PropTypes.string
  }

  render() {
    const {prefixCls, className, content, title, ...restProps} = this.props;

    const popClassName = cn({
      [`${prefixCls}-popup`]: true
    }, className);

    return (
      <div {...restProps} className={popClassName}>
        {title ? <div className={`${prefixCls}-popup-title`}>{title}</div> : ''}
        <div className={`${prefixCls}-popup-content`}>{content}</div>
      </div>
    );
  }
}
