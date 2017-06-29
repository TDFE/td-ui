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
    const { prefixCls } = this.props;
    return (
      <div className={`${prefixCls}-time`}>
        <div className={`${prefixCls}-time-item`}>
          <div className={`${prefixCls}-time-item-split`}/>
        </div>
        <div className={`${prefixCls}-time-split`}>~</div>
        <div className={`${prefixCls}-time-item`}>
          <div className={`${prefixCls}-time-item-split`}/>
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
      </div>
    );
  }
}
