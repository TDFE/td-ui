/**
 * Created by wxy on 2017/6/7.
 */

import React from 'react';
import Notice from './notice';
import s from './style/index';
import cn from 'classnames';

let messageInstance;
let prefixCls = s.messagePrefix;

function notice(type, content, time) {
  console.log(type);
  messageInstance = messageInstance || Notice.newInstance({
    prefixCls
  })
  messageInstance.notice({
    duration: time,
    content: (
      <div className={ cn(`${prefixCls}-custom-content`, `${prefixCls}-custom-content-${type}`) }>
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
  },
  error(content, time) {
    return notice('error', content, time);
  },
  success(content, time) {
    return notice('success', content, time);
  }
}
