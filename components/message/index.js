/**
 * Created by wxy on 2017/6/7.
 */

import React from 'react';
import Notice from './notice';
import Icon from '../icon';
import s from './style/index';

let messageInstance;
let prefixCls = s.messagePrefix;

function notice(type, content, time) {
  console.log(type, content, time)

  let iconType = ({
    info: 'search',
    warning: 'sort'
  })[type];

  messageInstance = messageInstance || Notice.newInstance({
      prefixCls
  })
  messageInstance.notice({
    content: (
      <div className={`${prefixCls}-custom-content`}>
        <Icon type={iconType}/>
        <span>{content}</span>
      </div>
    )
  })
}

export default {
  info(content, time) {
    return notice('info', content, time);
  },
  warning(content, time) {
    return notice('warning', content, time);
  }
}
