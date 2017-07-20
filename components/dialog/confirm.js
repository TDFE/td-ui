/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';
/* eslint-disable no-unused-vars */
import Button from '../button';
import Icon from '../icon';
import s from './style';
import DialogWarp from './dialogWarp';

export default function confirm(config) {
  let div = document.createElement('div');
  document.body.appendChild(div);

  const maskClosable = config.maskClosable === undefined ? false : config.maskClosable;
  const prefixCls = s.confirmPrefix

  function close() {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  }

  function onCancel() {
    close();
    if (config.onCancel) {
      config.onCancel()
    }
  }

  function onOk() {
    close();
    if (config.onOk) {
      config.onOk()
    }
  }

  ReactDOM.render(
    <DialogWarp
      visible={true}
      header=""
      footer=""
      maskClosable={maskClosable}
      closable={false}
      className={`${prefixCls} ${prefixCls}-${config.type}`}
      width={config.width || 416}
    >
        <div className={`${prefixCls}-inner`}>
        <div className={`${prefixCls}-body`}>
          <Icon type={config.icon} />
          <span className={`${prefixCls}-title`}>{config.title}</span>
          <div className={`${prefixCls}-content`}>{config.content}</div>
        </div>
        <div className={`${prefixCls}-btns`}>
          {config.cancelBtn ? <Button onClick={onCancel} style={{marginRight: 10}}>{ config.cancelText || '取消'}</Button> : '' }
          <Button onClick={onOk} type="primary">{ config.okText || '确定' }</Button>
        </div>
      </div>
    </DialogWarp>, div)

  return {
    destroy: close
  }
}
