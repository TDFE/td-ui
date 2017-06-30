/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-06-22 11:44:37
 * @Last modified by:   yzf
 * @Last modified time: 2017-06-26 14:00:03
 */

import React from 'react';
import PropTypes from 'prop-types';
import Select from '../../time-picker/select';
import classNames from 'classnames';
import {
  FULL_PICKER,
  MINUTE_PICKER
} from '../constant';
import s from '../style';

function generateOptions(length, isDisabled) {
  const options = [];
  for (let i = 0; i < length; i++) {
    options.push({
      value: i,
      disabled: isDisabled(i)
    });
  }
  return options;
}

export default class TimeTable extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string.isRequired,
    value: PropTypes.object,
    onSelect: PropTypes.func.isRequired,
    type: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.offset = s.datePickerPanelSize / 7 * 3;
    switch (props.type) {
      case FULL_PICKER:
        this.columnWidth = s.datePickerPanelSize / 3;
        break;
      case MINUTE_PICKER:
        this.columnWidth = s.datePickerPanelSize / 2;
        break;
      default:
        this.columnWidth = s.datePickerPanelSize;
        break;
    }
  }

  isHourDisabled = hour => {
    const { disabledDate, value } = this.props;
    if (!disabledDate) {
      return false;
    }
    const start = value.clone().hour(hour).minute(0).second(0);
    const end = value.clone().hour(hour).minute(59).second(59);
    return disabledDate(start) && disabledDate(end);
  };

  onHourSelect = (type, hour) => {
    const { value, onSelect } = this.props;
    onSelect(value.clone().hour(hour));
  };

  renderHours() {
    const { prefixCls, value } = this.props;
    const options = generateOptions(24, this.isHourDisabled);
    const selectedIndex = value.hour();
    const { offset, columnWidth } = this;
    return (
      <Select
        width={columnWidth}
        prefixCls={prefixCls}
        offset={offset}
        selectedIndex={selectedIndex}
        options={options}
        type="hour"
        value={value}
        onSelect={this.onHourSelect}
        render={item => <div>{item}</div>}
      />
    );
  }

  isMinuteDisabled = minute => {
    const { disabledDate, value } = this.props;
    if (!disabledDate) {
      return false;
    }
    const start = value.clone().minute(minute).second(0);
    const end = value.clone().minute(minute).second(59);
    return disabledDate(start) && disabledDate(end);
  };

  onMinuteSelect = (type, minute) => {
    const { value, onSelect } = this.props;
    onSelect(value.clone().minute(minute));
  };

  renderMinutes() {
    const { prefixCls, value } = this.props;
    const options = generateOptions(60, this.isMinuteDisabled);
    const selectedIndex = value.minute();
    const { offset, columnWidth } = this;
    return (
      <Select
        width={columnWidth}
        prefixCls={prefixCls}
        offset={offset}
        selectedIndex={selectedIndex}
        options={options}
        type="minute"
        value={value}
        onSelect={this.onMinuteSelect}
        render={item => <div>{item}</div>}
      />
    );
  }

  isSecondDisabled = second => {
    const { disabledDate, value } = this.props;
    if (!disabledDate) {
      return false;
    }
    const time = value.clone().second(second);
    return disabledDate(time);
  };

  onSecondSelect = (type, second) => {
    const { value, onSelect } = this.props;
    onSelect(value.clone().second(second));
  };

  renderSeconds() {
    const { prefixCls, value } = this.props;
    const options = generateOptions(60, this.isSecondDisabled);
    const selectedIndex = value.second();
    const { offset, columnWidth } = this;
    return (
      <Select
        width={columnWidth}
        prefixCls={prefixCls}
        offset={offset}
        selectedIndex={selectedIndex}
        options={options}
        type="second"
        value={value}
        onSelect={this.onSecondSelect}
        render={item => <div>{item}</div>}
      />
    );
  }

  renderMask() {
    const { prefixCls, type } = this.props;
    return (
      <div className={`${prefixCls}-mask`}>
        {
          type >= MINUTE_PICKER && <span className={
            classNames({
              [`${prefixCls}-mask-colon`]: type === MINUTE_PICKER,
              [`${prefixCls}-mask-first-colon`]: type === FULL_PICKER
            })
          }>:</span>
        }
        {
          type >= FULL_PICKER && <span className={`${prefixCls}-mask-second-colon`}>:</span>
        }
      </div>
    );
  }

  render() {
    const { prefixCls, type } = this.props;
    return (
      <div className={prefixCls}>
        {
          this.renderMask()
        }
        {
          this.renderHours()
        }
        {
          type >= MINUTE_PICKER && this.renderMinutes()
        }
        {
          type >= FULL_PICKER && this.renderSeconds()
        }
      </div>
    );
  }
}
