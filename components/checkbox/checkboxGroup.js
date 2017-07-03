/**
 * Created by sunxianxiong on 17/6/28.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import shallowEqual from 'shallowequal';
import is from '../util/is';
import Checkbox from './checkbox';
import s from './style';

export default class CheckboxGroup extends Component {
  static defaultProps = {
    prefixCls: s.checkboxPrefix,
    className: '',
    style: {}
  };

  static propTypes = {
    options: PropTypes.array,
    defaultValue: PropTypes.array,
    value: PropTypes.array,
    className: PropTypes.string,
    style: PropTypes.object,
    onChange: PropTypes.func,
    disabled: PropTypes.bool
  };

  // 通过context传递值
  static childContextTypes = {
    checkboxGroup: PropTypes.object
  };

  getChildContext() {
    return {
      checkboxGroup: {
        onChange: this.onCheckboxChange,
        disabled: this.props.disabled,
        value: this.state.checkboxValue
      }
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      checkboxValue: props.value || props.defaultValue || []
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.state = {
        checkboxValue: nextProps.value
      };
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState) || !shallowEqual(this.context.checkboxGroup, nextContext.checkboxGroup);
  };

  onCheckboxChange = e => {
    const index = this.state.checkboxValue.indexOf(e.target.value);
    const newCheckboxValue = [...this.state.checkboxValue];

    if (index === -1) {
      newCheckboxValue.push(e.target.value);
    } else {
      newCheckboxValue.splice(index, 1);
    }
    this.setState({checkboxValue: newCheckboxValue});

    this.props.onChange && this.props.onChange(newCheckboxValue);
  }

  render() {
    const {props} = this;
    const {
      className, style, prefixCls, options
    } = props;

    let children = props.children;

    if (options && options.length > 0) {
      children = options.map((option, index) => {
        if (is.String(option)) {
          return (
            <Checkbox
              key={index}
              disabled={props.disabled}
              value={option}
              checked={this.state.checkboxValue.indexOf(option) > -1}
              onChange={this.onCheckboxChange}
            >
              {option}
            </Checkbox>
          )
        } else if (is.Object(option)) {
          return (
            <Checkbox
              key={index}
              disabled={option.disabled || props.disabled}
              value={option.value}
              checked={this.state.checkboxValue.indexOf(option.value) > -1}
              onChange={this.onCheckboxChange}
            >
              {option.label}
            </Checkbox>
          )
        }
      })
    }

    const st = Object.assign({}, style);
    const classNames = cn(className, {
      [`${prefixCls}-group`]: true
    });

    return (
      <div
        className={classNames}
        style={st}
      >
        {children}
      </div>
    );
  }
}
