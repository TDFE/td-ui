/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-06-28 11:30:03
 * @Last modified by:   yzf
 * @Last modified time: 2017-06-28 11:30:05
 */

import React from 'react';

export default class RangeCalendar extends React.Component {
  renderTool() {
    const { prefixCls } = this.props;
    return (
      <div className={`${prefixCls}-tool`}>
        <div className={`${prefixCls}-tool-split`}/>
      </div>
    );
  }

  renderTime() {
    const { prefixCls, value, format } = this.props;
    return (
      <div className={`${prefixCls}-time`}>
        <div className={`${prefixCls}-time-item`}>
          <span className={`${prefixCls}-time-item-label`}>开始时间</span>
          <span className={`${prefixCls}-time-item-value`}>{value[0].format(format)}</span>
          <div className={`${prefixCls}-time-item-split`}/>
        </div>
        <div className={`${prefixCls}-time-split`}>~</div>
        <div className={`${prefixCls}-time-item`}>
          <span className={`${prefixCls}-time-item-label`}>结束时间</span>
          <span className={`${prefixCls}-time-item-value`}>{value[1].format(format)}</span>
          <div className={`${prefixCls}-time-item-split`}/>
        </div>
      </div>
    );
  }

  renderPanel() {
    const { prefixCls } = this.props;
    return (
      <div className={`${prefixCls}-panel`}>
        <div className={`${prefixCls}-container`}>
          <div className={`${prefixCls}-header`}></div>
          <div className={`${prefixCls}-table`}></div>
        </div>
        <div className={`${prefixCls}-panel-split`}/>
        <div className={`${prefixCls}-container`}>
          <div className={`${prefixCls}-header`}></div>
          <div className={`${prefixCls}-table`}></div>
        </div>
      </div>
    );
  }

  render() {
    const { prefixCls } = this.props;
    return (
      <div className={prefixCls}>
        {
          this.renderTool()
        }
        {
          this.renderTime()
        }
        {
          this.renderPanel()
        }
      </div>
    );
  }
}
