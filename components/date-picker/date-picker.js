/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-06-22 11:56:15
 * @Last modified by:   yzf
 * @Last modified time: 2017-06-22 11:56:16
 */

import React from 'react';
import warning from 'warning';
import omit from 'lodash/omit';
import PropTypes from 'prop-types';
import Picker from './picker';
import s from './style';
import {
  FULL_PICKER,
  MINUTE_PICKER,
  HOUR_PICKER,
  DAY_PICKER,
  MONTH_PICKER,
  YEAR_PICKER,
  YEAR,
  MONTH,
  DAY
} from './constant';

class Calendar extends React.Component {
  static propTypes = {
    disabledDate: PropTypes.func,
    value: PropTypes.object,
    defaultValue: PropTypes.object,
    className: PropTypes.string,
    style: PropTypes.object,
    onSelect: PropTypes.func,
    onOk: PropTypes.func,
    onClear: PropTypes.func,
    format: PropTypes.string,
    prefixCls: PropTypes.string
  };

  constructor(props) {
    super(props);
    const calendarType = this.getCalendarType();
    let selectingType = calendarType >= DAY_PICKER ? DAY : (calendarType === MONTH_PICKER ? MONTH : YEAR);
    this.state = {
      selectingType
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

  onSelect = () => {};

  onClear = () => {};

  renderHeader = () => {
    const { prefixCls } = this.props;
    return (
      <div className={`${prefixCls}-header`}></div>
    );
  };

  renderTable = () => {};

  renderFooter = () => {};

  render() {
    const { prefixCls } = this.props;
    return (
      <div className={prefixCls}>
        {
          this.renderHeader()
        }
        {
          this.renderTable()
        }
        {
          this.renderFooter()
        }
      </div>
    )
  }
}

export default class DatePicker extends React.Component {
  static defaultProps = {
    prefixCls: s.datePickerPrefix
  };

  constructor(props) {
    super(props);
    const value = props.value || props.defaultValue;
    if (value && !moment.isMoment(value)) {
      throw new Error('The value/defaultValue of DatePicker or MonthPicker must be a moment object');
    }
    this.state = {
      value
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value
      });
    }
  }

  render() {
    // const { value } = this.state;
    const props = omit(this.props, ['onChange']);
    const { prefixCls } = props;
    const calendar = (
      <Calendar prefixCls={`${prefixCls}-calendar`}/>
    );
    const input = ({ value: inputValue }) => (
      <div>
        <input
          readOnly
          value={(inputValue && inputValue.format(props.format)) || ''}
          placeholder="请选择"
          className={`${prefixCls}-input ${s.inputPrefix}`}
          />
        <span className={`${prefixCls}-icon`}/>
      </div>
    );

    return (
      <span className={prefixCls}>
        <Picker
          transitionName="slide-up"
          prefixCls={`${prefixCls}-container`}
          calendar={calendar}
          >
          {input}
        </Picker>
      </span>
    );
  }
}
