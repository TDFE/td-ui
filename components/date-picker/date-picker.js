/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-06-22 11:56:15
 * @Last modified by:   yzf
 * @Last modified time: 2017-06-22 11:56:16
 */

import React from 'react';
import omit from 'lodash/omit';
import moment from 'moment';
import Picker from './picker';
import Input from '../input';
import Icon from '../icon';
import Calendar from './calendar';
import s from './style';

export default class DatePicker extends React.Component {
  static defaultProps = {
    prefixCls: s.datePickerPrefix,
    format: 'YYYY-MM-DD HH:mm:ss',
    allowClear: true
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

  handleChange = (value) => {
    const props = this.props;
    if (!('value' in props)) {
      this.setState({ value });
    }
    if ('onChange' in props) {
      props.onChange(value, (value && value.format(props.format)) || '');
    }
  }

  clearSelection = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.handleChange(null);
  }

  render() {
    const { value } = this.state;
    const props = omit(this.props, ['onChange']);
    const { prefixCls, format, placeholder, allowClear, disabled } = props;
    const calendar = (
      <Calendar
        prefixCls={`${prefixCls}-calendar`}
        onSelect={this.handleChange}
        format={format}
        disabledDate={props.disabledDate}
        defaultValue={props.defaultPickerValue || moment()}
        showFooter={true}
      />
    );
    const icon = allowClear && !disabled && value ? (
      <Icon
        type="cross-circle"
        className={`${prefixCls}-clear`}
        onClick={this.clearSelection}
      />
    ) : <Icon type="calendar" />;
    const input = ({ value: inputValue }) => (
      <div>
        <Input
          readOnly
          disabled={disabled}
          value={(inputValue && inputValue.format(format)) || ''}
          placeholder={placeholder || '请选择'}
          className={`${prefixCls}-input`}
          suffix={icon}
        />
      </div>
    );

    return (
      <span className={prefixCls}>
        <Picker
          value={value}
          transitionName="slide-up"
          prefixCls={`${prefixCls}-container`}
          calendar={calendar}
          onChange={this.handleChange}
        >
          {input}
        </Picker>
      </span>
    );
  }
}
