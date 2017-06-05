/**
 * @Author: can.yang <yc>
 * @Date:   2017-05-29 15:20:36
 * @Last modified by:   yc
 * @Last modified time: 2017-05-29 15:20:42
 */
import React from 'react';
import PropTypes from 'prop-types';
import s from './style';

export default class BreadcrumbItem extends React.Component {
  static defaultProps = {
    prefixCls: s.breadcrumbPrefix,
    separator: '/'
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    separator: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    href: PropTypes.string
  };

  render() {
    const { prefixCls, separator, children, ...restProps } = this.props;
    let link;
    if ('href' in this.props) {
      link = <a className={`${prefixCls}-item`} {...restProps}>{children}</a>;
    } else {
      link = <span className={`${prefixCls}-item`} {...restProps}>{children}</span>;
    }
    if (children) {
      return (
        <span>
          {link}
          <span className={`${prefixCls}-separator`}>{separator}</span>
        </span>
      );
    }
    return null;
  }
}
