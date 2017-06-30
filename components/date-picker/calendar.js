/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-06-29 14:27:36
 * @Last modified by:   yzf
 * @Last modified time: 2017-06-29 14:28:06
 */

import React from 'react';
import warning from 'warning';
import PropTypes from 'prop-types';
import moment from 'moment';
import cn from 'classnames';
import Button from '../button';
import {
  FULL_PICKER,
  MINUTE_PICKER,
  HOUR_PICKER,
  DAY_PICKER,
  MONTH_PICKER,
  YEAR_PICKER,
  YEAR,
  MONTH,
  DAY,
  TIME
} from './constant';
import { DateTable, MonthTable, YearTable, TimeTable } from './common';

export default class Calendar extends React.Component {
  static propTypes = {
    disabledDate: PropTypes.func,
    value: PropTypes.object,
    defaultValue: PropTypes.object,
    className: PropTypes.string,
    style: PropTypes.object,
    onSelect: PropTypes.func,
    format: PropTypes.string,
    prefixCls: PropTypes.string
  };

  constructor(props) {
    super(props);
    const calendarType = this.getCalendarType();
    let selectingType = calendarType >= DAY_PICKER ? DAY : (calendarType === MONTH_PICKER ? MONTH : YEAR);
    this.state = {
      selectingType,
      calendarType,
      value: props.value || props.defaultValue || moment()
    };
  }

  getCalendarType = () => {
    const { format } = this.props;
    if (!format) {
      return FULL_PICKER;
    }
    let type = 0;
    if (format.indexOf('ss') >= 0) {
      type += 1;
    }
    if (format.indexOf('mm') >= 0) {
      type += 10;
    }
    if (format.indexOf('HH') >= 0) {
      type += 100;
    }
    if (format.indexOf('DD') >= 0) {
      type += 1000;
    }
    if (format.indexOf('MM') >= 0) {
      type += 10000;
    }
    if (format.indexOf('YYYY') >= 0) {
      type += 100000;
    }
    switch (type) {
      case FULL_PICKER:
      case MINUTE_PICKER:
      case HOUR_PICKER:
      case DAY_PICKER:
      case MONTH_PICKER:
      case YEAR_PICKER:
        break;
      default:
        warning(false, `Format ${format} is not support. Use default format YYYY-MM-DD HH:mm:ss.`);
        type = FULL_PICKER;
        break;
    }
    return type;
  };

  onPrev = () => {
    const { selectingType, value } = this.state;
    const { disabledDate } = this.props;
    let newValue = value.clone();
    switch (selectingType) {
      case TIME:
        newValue.subtract(1, 'days');
        break;
      case DAY:
        newValue.subtract(1, 'months');
        break;
      case MONTH:
        newValue.subtract(1, 'years');
        break;
      default:
        newValue.subtract(10, 'years');
        break;
    }
    if (!disabledDate || !disabledDate(newValue)) {
      this.setState({ value: newValue });
      this.props.onSelect(newValue);
    }
  };

  onNext = () => {
    const { disabledDate } = this.props;
    const { selectingType, value } = this.state;
    let newValue = value.clone();
    switch (selectingType) {
      case TIME:
        newValue.add(1, 'days');
        break;
      case DAY:
        newValue.add(1, 'months');
        break;
      case MONTH:
        newValue.add(1, 'years');
        break;
      default:
        newValue.add(10, 'years');
        break;
    }
    if (!disabledDate || !disabledDate(newValue)) {
      this.setState({ value: newValue });
      this.props.onSelect(newValue);
    }
  };

  onSelectingTypeChange = () => {
    const { selectingType } = this.state;
    switch (selectingType) {
      case TIME:
        this.setState({ selectingType: DAY });
        break;
      case DAY:
        this.setState({ selectingType: MONTH });
        break;
      case MONTH:
        this.setState({ selectingType: YEAR });
        break;
      default:
        break;
    }
  };

  onDateSelect = current => {
    this.setState({ value: current });
    if (this.state.calendarType >= HOUR_PICKER) {
      this.setState({ selectingType: TIME });
    }
    this.props.onSelect(current);
  };

  onMonthSelect = current => {
    this.setState({ value: current });
    if (this.state.calendarType >= DAY_PICKER) {
      this.setState({ selectingType: DAY });
    }
    this.props.onSelect(current);
  };

  onYearSelect = current => {
    this.setState({ value: current });
    if (this.state.calendarType >= MONTH_PICKER) {
      this.setState({ selectingType: MONTH });
    }
    this.props.onSelect(current);
  };

  onTimeSelect = current => {
    this.setState({ value: current });
    this.props.onSelect(current);
  };

  renderHeader = () => {
    const { prefixCls } = this.props;
    const { selectingType, value } = this.state;
    return (
      <div className={`${prefixCls}-header`}>
        <Button type="noborder" icon="return" onClick={this.onPrev}/>
        <div className={`${prefixCls}-header-btn`} onClick={this.onSelectingTypeChange}>
        {
          selectingType === TIME ? value.format('YYYY年MM月DD日') : (
            selectingType === DAY ? value.format('YYYY年MM月') : (
              selectingType === MONTH ? value.format('YYYY年') : `${Math.floor(value.year() / 10) * 10}年-${Math.ceil(value.year() / 10) * 10 - 1}`
            )
          )
        }
        </div>
        <Button type="noborder" icon="enter" onClick={this.onNext}/>
      </div>
    );
  };

  renderTable = () => {
    const { prefixCls } = this.props;
    const { selectingType, value, calendarType } = this.state;
    return (
      <div className={`${prefixCls}-table`}>
        {
          selectingType === DAY && (
            <DateTable
              prefixCls={`${prefixCls}-table-date`}
              onSelect={this.onDateSelect}
              value={value}
              />
          )
        }
        {
          selectingType === MONTH && (
            <MonthTable
              prefixCls={`${prefixCls}-table-month`}
              onSelect={this.onMonthSelect}
              value={value}
              />
          )
        }
        {
          selectingType === YEAR && (
            <YearTable
              prefixCls={`${prefixCls}-table-year`}
              onSelect={this.onYearSelect}
              value={value}
              />
          )
        }
        {
          selectingType === TIME && (
            <TimeTable
              prefixCls={`${prefixCls}-table-time`}
              onSelect={this.onTimeSelect}
              value={value}
              type={calendarType}
              />
          )
        }
      </div>
    );
  };

  onNow = () => {
    const value = moment();
    this.setState({ value });
    this.props.onSelect(value);
  };

  onToday = () => {
    const value = this.state.value.clone();
    const today = moment();
    value.date(today.date()).month(today.month()).year(today.year());
    if (value.valueOf() >= today.valueOf()) {
      this.setState({ value });
      this.props.onSelect(value);
    } else {
      this.setState({ value: today, selectingType: DAY });
      this.props.onSelect(today);
    }
  };

  onCurMonth = () => {
    const value = this.state.value.clone();
    const today = moment();
    value.month(today.month()).year(today.year());
    if (value.valueOf() >= today.valueOf()) {
      this.setState({ value });
      this.props.onSelect(value);
    } else {
      this.setState({ value: today, selectingType: MONTH });
      this.props.onSelect(today);
    }
  };

  onCurYear = () => {
    const value = this.state.value.clone();
    const today = moment();
    value.year(today.year());
    if (value.valueOf() >= today.valueOf()) {
      this.setState({ value });
      this.props.onSelect(value);
    } else {
      this.setState({ value: today });
      this.props.onSelect(today);
    }
  };

  renderFooter = () => {
    const { prefixCls } = this.props;
    const { selectingType, calendarType } = this.state;
    return (
      <div className={`${prefixCls}-footer`}
        onClick={
          selectingType === TIME ? this.onNow : (
            (selectingType === DAY || calendarType >= DAY_PICKER) ? this.onToday : (
              (selectingType === MONTH || calendarType >= MONTH_PICKER) ? this.onCurMonth : this.onCurYear
            )
          )
        }>
        {
          selectingType === TIME ? '此刻' : (
            (selectingType === DAY || calendarType >= DAY_PICKER) ? '今天' : (
              (selectingType === MONTH || calendarType >= MONTH_PICKER) ? '本月' : '今年'
            )
          )
        }
      </div>
    );
  };

  render() {
    const { prefixCls, showFooter, className } = this.props;

    return (
      <div className={cn(prefixCls, className)}>
        {
          this.renderHeader()
        }
        {
          this.renderTable()
        }
        {
          showFooter && this.renderFooter()
        }
      </div>
    )
  }
}
