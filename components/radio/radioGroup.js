/**
 * Created by sunxianxiong on 17/6/2.
 */
/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import shallowEqual from 'shallowequal';
import is from '../util/is';
import Radio from './radio';
import s from './style';

export default class RadioGroup extends Component {
  static defaultProps = {
    prefixCls: s.radioPrefix,
    className: '',
    style: {}
  };

  static propTypes = {
    option: PropTypes.array,
    defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    size: PropTypes.oneOf(['large', 'default', 'small']),
    direction: PropTypes.oneOf(['horizontal', 'vertical']),
    className: PropTypes.string,
    style: PropTypes.object,
    onChange: PropTypes.func,
    disabled: PropTypes.bool
  };

  //  通过context传递值
  static childContextTypes = {
    radioGroup: PropTypes.object
  };

  getChildContext() {
    return {
      radioGroup: {
        onChange: this.onRadioChange,
        disabled: this.props.disabled,
        value: this.state.radioValue,
        direction: this.props.direction
      }
    };
  }

  constructor(props) {
    super(props);

    let radioValue = '';

    if ('value' in props) {
      radioValue = props.value;
    } else if ('defaultValue' in props) {
      radioValue = props.defaultValue;
    } else if (props.children && props.children.length > 0) {
      radioValue = this.getCheckedRadioValue(props.children);
    }

    this.state = {
      radioValue
    };
  }

  getCheckedRadioValue = (children) => {
    let radioValue = '';
    let matched = false;

    //  默认选中radioGroup中末尾的checked或defaultChecked值
    React.Children.forEach(children, (radio) => {
      if (radio && radio.props && (radio.props.checked || radio.props.defaultChecked)) {
        radioValue = radio.props.checked || radio.props.defaultChecked;
        matched = true;
      }
    });
    return matched ? radioValue : '';
  };

  componentWillReceiveProps(nextProps) {
    let radioValue;
    if ('value' in nextProps) {
      radioValue = nextProps.value;
    } else if ('defaultValue' in nextProps) {
      radioValue = nextProps.defaultValue;
    } else if (nextProps.children && nextProps.children.length > 0) {
      radioValue = this.getCheckedRadioValue(nextProps.children);
    }

    this.state = {
      radioValue
    };
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState) || !shallowEqual(this.context.radioGroup, nextContext.radioGroup);
  };

  onRadioChange = e => {
    const lastRadioValue = this.state.radioValue;

    if (lastRadioValue !== e.target.value) {
      this.setState({radioValue: e.target.value});
    }

    this.props.onChange && lastRadioValue !== e.target.value && this.props.onChange(e);
  }

  render() {
    const {props} = this;
    const {
      className, size = '', style, prefixCls, options
    } = props;

    let sizeCls = '';
    switch (size) {
      case 'large':
        sizeCls = 'lg';
        break;
      case 'small':
        sizeCls = 'sm';
        break;
      default:
        break;
    }

    let children = props.children;

    if (options && options.length > 0) {
      children = options.map((option, index) => {
        if (is.String(option)) {
          return (
            <Radio
              key={index}
              disabled={props.disabled}
              value={option}
              checked={this.state.radioValue === option}
              onChange={this.onRadioChange}
            >
              {option}
            </Radio>
          )
        } else if (is.Object(option)) {
          return (
            <Radio
              key={index}
              disabled={option.disabled || props.disabled}
              value={option.value}
              checked={this.state.radioValue === option.value}
              onChange={this.onRadioChange}
            >
              {option.label}
            </Radio>
          )
        }
      })
    }

    const st = Object.assign({}, style);
    const classNames = cn(className, {
      [`${prefixCls}-group`]: true,
      [`${prefixCls}-group-${sizeCls}`]: sizeCls
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
