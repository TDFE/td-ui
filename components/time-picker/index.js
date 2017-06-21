/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-06-21 09:54:15
 * @Last modified by:   yzf
 * @Last modified time: 2017-06-21 09:54:18
 */

import React from 'react';
import Picker from './picker';
import moment from 'moment';
import classNames from 'classnames';
import s from './style';

export default class TimePicker extends React.Component {
  static defaultProps = {
    prefixCls: s.timePickerPrefix,
    align: {
      offset: [0, -2]
    },
    disabled: false,
    disabledHours: undefined,
    disabledMinutes: undefined,
    disabledSeconds: undefined,
    hideDisabledOptions: false,
    placement: 'bottomLeft',
    transitionName: 'slide-up'
  };

  constructor(props) {
    super(props);
    const value = props.value || props.defaultValue;
    if (value && !moment.isMoment(value)) {
      throw new Error(
        'The value/defaultValue of TimePicker must be a moment object'
      );
    }
    this.state = {
      value
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({ value: nextProps.value });
    }
  }

  handleChange = value => {
    if (!('value' in this.props)) {
      this.setState({ value });
    }
    const { onChange, format = 'HH:mm:ss' } = this.props;
    if (onChange) {
      onChange(value, (value && value.format(format)) || '');
    }
  };

  handleOpenClose = ({ open }) => {
    const { onOpenChange } = this.props;
    if (onOpenChange) {
      onOpenChange(open);
    }
  };

  saveTimePicker = timePickerRef => {
    this.timePickerRef = timePickerRef;
  };

  focus = () => {
    this.timePickerRef.focus();
  };

  getDefaultFormat = () => {
    const { format, use12Hours } = this.props;
    if (format) {
      return format;
    } else if (use12Hours) {
      return 'h:mm:ss a';
    }
    return 'HH:mm:ss';
  };

  render() {
    const props = Object.assign({}, this.props);
    delete props.defaultValue;

    const format = this.getDefaultFormat();
    const className = classNames(props.className, {
      [`${props.prefixCls}-${props.size}`]: !!props.size
    });

    const addon = (panel) => (
      props.addon ? (
        <div className={`${props.prefixCls}-panel-addon`}>
          {props.addon(panel)}
        </div>
      ) : null
    );

    return (
      <Picker
        showHour={format.indexOf('HH') > -1 || format.indexOf('h') > -1}
        showMinute={format.indexOf('mm') > -1}
        showSecond={format.indexOf('ss') > -1}
        {...props}
        ref={this.saveTimePicker}
        format={format}
        className={className}
        value={this.state.value}
        placeholder={props.placeholder === undefined ? '请选择时间' : props.placeholder}
        onChange={this.handleChange}
        onOpen={this.handleOpenClose}
        onClose={this.handleOpenClose}
        addon={addon}
      />
    );
  }
}
