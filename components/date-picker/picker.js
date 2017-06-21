/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-06-21 14:46:57
 * @Last modified by:   yzf
 * @Last modified time: 2017-06-21 14:46:58
 */

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import createChainedFunction from '../util/createChainedFunction';
import KeyCode from '../util/keyCode';
import Trigger from 'rc-trigger';
import placements from './placements';

function noop() {
}

function refFn(field, component) {
  this[field] = component;
}

export default class Picker extends React.Component {
  static propTypes = {
    animation: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    disabled: PropTypes.bool,
    transitionName: PropTypes.string,
    onChange: PropTypes.func,
    onOpenChange: PropTypes.func,
    children: PropTypes.func,
    getCalendarContainer: PropTypes.func,
    calendar: PropTypes.element,
    style: PropTypes.object,
    open: PropTypes.bool,
    defaultOpen: PropTypes.bool,
    prefixCls: PropTypes.string,
    placement: PropTypes.any,
    value: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ]),
    defaultValue: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ]),
    align: PropTypes.object
  };

  static defaultProps = {
    prefixCls: 'rc-calendar-picker',
    style: {},
    align: {},
    placement: 'bottomLeft',
    defaultOpen: false,
    onChange: noop,
    onOpenChange: noop
  };

  constructor(props) {
    super(props);
    let open;
    if ('open' in props) {
      open = props.open;
    } else {
      open = props.defaultOpen;
    }
    const value = props.value || props.defaultValue;
    this.saveCalendarRef = refFn.bind(this, 'calendarInstance');
    this.state = {
      open,
      value
    };
  }

  componentWillReceiveProps(nextProps) {
    const { value, open } = nextProps;
    if ('value' in nextProps) {
      this.setState({
        value
      });
    }
    if (open !== undefined) {
      this.setState({
        open
      });
    }
  }

  componentDidUpdate(_, prevState) {
    if (!prevState.open && this.state.open) {
      // setTimeout is for making sure saveCalendarRef happen before focusCalendar
      this.focusTimeout = setTimeout(this.focusCalendar, 0, this);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.focusTimeout);
  }

  getCalendarElement = () => {
    const props = this.props;
    const state = this.state;
    const calendarProps = props.calendar.props;
    const { value } = state;
    const defaultValue = value;
    const extraProps = {
      ref: this.saveCalendarRef,
      defaultValue: defaultValue || calendarProps.defaultValue,
      selectedValue: value,
      onKeyDown: this.onCalendarKeyDown,
      onOk: createChainedFunction(calendarProps.onOk, this.onCalendarOk),
      onSelect: createChainedFunction(calendarProps.onSelect, this.onCalendarSelect),
      onClear: createChainedFunction(calendarProps.onClear, this.onCalendarClear),
    };

    return React.cloneElement(props.calendar, extraProps);
  };

  setOpen = (open, cb) => {
    const { onOpenChange } = this.props;
    if (this.state.open !== open) {
      if (!('open' in this.props)) {
        this.setState({
          open,
        }, cb);
      }
      onOpenChange(open);
    }
  };

  open = cb => this.setOpen(true, cb);

  close = cb => this.setOpen(false, cb);

  focus = () => !this.state.open && ReactDOM.findDOMNode(this).focus();

  focusCalendar = () => this.state.open && this.calendarInstance && this.calendarInstance.focus();

  onCalendarKeyDown = evt => {
    if (evt.keyCode === KeyCode.ESC) {
      evt.stopPropagation();
      this.close(this.focus);
    }
  };

  onKeyDown = evt => {
    if (evt.keyCode === KeyCode.DOWN && !this.state.open) {
      this.open();
      evt.preventDefault();
    }
  };

  onCalendarSelect = (value, cause = {}) => {
    const props = this.props;
    if (!('value' in props)) {
      this.setState({
        value
      });
    }
    if (
      cause.source === 'keyboard' ||
      (!props.calendar.props.timePicker && cause.source !== 'dateInput') ||
      cause.source === 'todayButton') {
      this.close(this.focus);
    }
    props.onChange(value);
  };

  onCalendarOk = () => this.close(this.focus);

  onCalendarClear = () => this.close(this.focus);

  onVisibleChange = open => this.setOpen(open);

  render() {
    const {
      prefixCls, placement,
      style, getCalendarContainer,
      align, animation,
      disabled,
      transitionName, children
    } = this.props;

    return (<Trigger
      popup={this.getCalendarElement()}
      popupAlign={align}
      builtinPlacements={placements}
      popupPlacement={placement}
      action={(disabled && !this.state.open) ? [] : ['click']}
      destroyPopupOnHide
      getPopupContainer={getCalendarContainer}
      popupStyle={style}
      popupAnimation={animation}
      popupTransitionName={transitionName}
      popupVisible={this.state.open}
      onPopupVisibleChange={this.onVisibleChange}
      prefixCls={prefixCls}
    >
      {React.cloneElement(children(this.state, this.props), { onKeyDown: this.onKeyDown })}
    </Trigger>);
  }
}
