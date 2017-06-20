/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-06-14 11:42:16
 * @Last modified by:   yzf
 * @Last modified time: 2017-06-14 11:42:17
 */

import React from 'react';
import classNames from 'classnames';
import Sider from './sider';
import s from './style';

function generator(props) {
  return Basic => {
    return class Adapter extends React.Component {
      render() {
        const { prefixCls } = props;
        return <Basic prefixCls={prefixCls} {...this.props}/>;
      }
    };
  };
}

class Basic extends React.Component {
  render() {
    const { prefixCls, className, children, ...others } = this.props;
    let hasSider;
    React.Children.forEach(children, element => {
      if (element && element.type && element.type.__ANT_LAYOUT_SIDER) {
        hasSider = true;
      }
    });
    const divCls = classNames(className, prefixCls, {
      [`${prefixCls}-has-sider`]: hasSider
    });
    return (
      <div className={divCls} {...others}>{children}</div>
    );
  }
}

const Layout = generator({
  prefixCls: s.layoutPrefix,
})(Basic);

const Header = generator({
  prefixCls: `${s.layoutPrefix}-header`,
})(Basic);

const Footer = generator({
  prefixCls: `${s.layoutPrefix}-footer`,
})(Basic);

const Content = generator({
  prefixCls: `${s.layoutPrefix}-content`,
})(Basic);

Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;
Layout.Sider = Sider;

export default Layout;
