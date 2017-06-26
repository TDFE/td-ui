/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-05-24 15:04:30
 * @Last modified by:   yzf
 * @Last modified time: 2017-05-24 15:04:33
 */

import s from '../style/themes/default.less';
/* eslint-disable no-unused-vars */
import React from 'react';
import cn from 'classnames';
import omit from 'lodash/omit';

export default function Icon(props) {
  const { type, className = '' } = props;
  const classString = cn({
    [s.iconPrefix]: true,
    [`${s.iconPrefix}-${type}`]: !!type
  }, className);
  return <i {...omit(props, ['type'])} className={classString} />;
}
