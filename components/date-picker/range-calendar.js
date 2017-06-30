/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-06-28 11:30:03
 * @Last modified by:   yzf
 * @Last modified time: 2017-06-28 11:30:05
 */

import React from 'react';
import moment from 'moment';
import Button from '../button';
import Calendar from './calendar';

const ButtonGroup = Button.Group;

export default class RangeCalendar extends React.Component {
  onRangeClick = offset => {
    const today = moment();
    const start = today.clone().hour(0).minute(0).second(0);
    const end = today.clone().hour(23).minute(59).second(59);
    if (offset === 0) {
      this.props.onSelect([start, end]);
    } else if (offset === 1) {
      this.props.onSelect([start.subtract(1, 'day'), end.subtract(1, 'day')]);
    } else {
      this.props.onSelect([start.subtract(offset - 1, 'day'), end]);
    }
  };

  renderTool() {
    const { prefixCls } = this.props;
    return (
      <div className={`${prefixCls}-tool`}>
        <ButtonGroup>
          <Button type="noborder" onClick={this.onRangeClick.bind(this, 1)}>昨天</Button>
          <Button type="noborder" onClick={this.onRangeClick.bind(this, 0)}>今天</Button>
          <Button type="noborder" onClick={this.onRangeClick.bind(this, 3)}>最近三天</Button>
          <Button type="noborder" onClick={this.onRangeClick.bind(this, 7)}>最近七天</Button>
          <Button type="noborder" onClick={this.onRangeClick.bind(this, 30)}>最近三十天</Button>
          <Button type="noborder" onClick={this.onRangeClick.bind(this, 90)}>最近九十天</Button>
        </ButtonGroup>
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
          <span className={`${prefixCls}-time-item-value`}>{value[0] ? value[0].format(format) : ''}</span>
          <div className={`${prefixCls}-time-item-split`}/>
        </div>
        <div className={`${prefixCls}-time-split`}>~</div>
        <div className={`${prefixCls}-time-item`}>
          <span className={`${prefixCls}-time-item-label`}>结束时间</span>
          <span className={`${prefixCls}-time-item-value`}>{value[1] ? value[1].format(format) : ''}</span>
          <div className={`${prefixCls}-time-item-split`}/>
        </div>
      </div>
    );
  }

  disabledStartDate = start => {
    const { value, disabledDate } = this.props;
    const end = value[1];
    if (!end) {
      return disabledDate && disabledDate(start);
    }
    return (disabledDate && disabledDate(start)) || (start.valueOf() >= end.valueOf());
  };

  disabledEndDate = end => {
    const { value, disabledDate } = this.props;
    const start = value[0];
    if (!start) {
      return disabledDate && disabledDate(end);
    }
    return (disabledDate && disabledDate(end)) || (end.valueOf() <= start.valueOf());
  };

  onStartSelect = start => {
    const { value } = this.props;
    this.props.onSelect([start, value[1]]);
  };

  onEndSelect = end => {
    const { value } = this.props;
    this.props.onSelect([value[0], end]);
  };

  renderPanel() {
    const { prefixCls, value, format } = this.props;
    return (
      <div className={`${prefixCls}-panel`}>
        <div className={`${prefixCls}-container`}>
          <Calendar
            prefixCls={`${prefixCls}-tables`}
            value={value[0]}
            format={format}
            disabledDate={this.disabledStartDate}
            onSelect={this.onStartSelect}
            />
        </div>
        <div className={`${prefixCls}-panel-split`}/>
        <div className={`${prefixCls}-container`}>
          <Calendar
            prefixCls={`${prefixCls}-tables`}
            className={`${prefixCls}-tables-right`}
            value={value[1]}
            format={format}
            disabledDate={this.disabledEndDate}
            onSelect={this.onEndSelect}
            />
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
