/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-06-13 16:02:43
 * @Last modified by:   yzf
 * @Last modified time: 2017-06-13 16:03:02
 */

import React from 'react';
import cn from 'classnames';
import s from './style';

export default function ButtonGroup(props) {
  const { prefixCls = `${s.btnPrefix}-group`, size = '', className, ...others } = props;
  // large => lg
  // small => sm
  let sizeCls = '';
  switch (size) {
    case 'large':
      sizeCls = 'lg';
      break;
    case 'small':
      sizeCls = 'sm';
      break;
    default:
      break;
  }

  const classes = cn(prefixCls, {
    [`${prefixCls}-${sizeCls}`]: sizeCls
  }, className);

  return <div {...others} className={classes} />;
}
