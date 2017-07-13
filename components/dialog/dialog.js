import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
/* eslint-disable no-unused-vars */
import Button from '../button';
/* eslint-disable no-unused-vars */
import Icon from '../icon';
import s from './style';

function noop() {}

export default class Dialog extends React.Component {
  static defaultProps = {
    prefixCls: s.dialogPrefix,
    width: 520,
    onOk: noop,
    onCancel: noop,
    okText: '确定',
    cancelText: '取消',
    maskClosable: true,
    closable: true,
    className: ''
  }

  static propTypes = {
    prefixCls: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    okText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    maskClosable: PropTypes.bool
  }

  maskClose = (e) => {
    if (e.target === e.currentTarget) {
      this.props.onCancel();
    }
  }

  renderHeader = () => {
    const { prefixCls, title, header } = this.props;
    if (header !== undefined && (header === null || header === '')) {
      return ''
    } else {
      return <div className={`${prefixCls}-header`}>{header || title}</div>
    }
  }

  renderFooter = () => {
    const { prefixCls, footer, cancelText, okText } = this.props;
    const footerDom = footer;
    const defaultFooter = [(
      <Button
        key="cancel"
        size="large"
        key="cancel"
        onClick={() => this.props.onCancel()}
      >
        {cancelText}
      </Button>
    ), (
      <Button
        type="primary"
        size="large"
        key="ok"
        onClick={() => this.props.onOk()}
      >
        {okText}
      </Button>
    )];
    return footer === '' || footer === null ? '' : <div className={`${prefixCls}-footer`}>{footer || defaultFooter}</div>
  }

  render() {
    const { visible, prefixCls, children, width, maskClosable, closable, className } = this.props;
    return (<div>
      <div className={cn(`${prefixCls}-mask`, { [`${prefixCls}-mask-hidden`]: !visible })}></div>
      <div className={cn(`${prefixCls}-wrap`, { [`${prefixCls}-wrap-hidden`]: !visible })} onClick={maskClosable ? this.maskClose : null}>
        <div className={`${prefixCls} ${className}`} style={{ width }}>
          <div className={`${prefixCls}-content`}>
            {closable ? <button className={`${prefixCls}-close`} onClick={() => this.props.onCancel()}><Icon type='cross'/></button> : ''}
            {this.renderHeader()}
            <div className={`${prefixCls}-body`}>
              {children}
            </div>
            {this.renderFooter()}
          </div>
        </div>
      </div>
    </div>);
  }
}
