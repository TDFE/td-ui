/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import cn from 'classnames';
import s from './style';
import { getOffsetLeft } from './util';

const prefixCls = s.ratePrefix;

class Rate extends Component {
  static defaultProps = {
    count: 5,
    defaultValue: 0,
    allowHalf: false,
    disabled: false,
    character: 'A',
    full: false
  }
  static PropTypes = {
    count: PropTypes.number,
    value: PropTypes.number,
    defaultValue: PropTypes.number,
    allowHalf: PropTypes.bool,
    disabled: PropTypes.bool,
    character: PropTypes.oneOf([PropTypes.element, PropTypes.string]),
    className: PropTypes.string,
    style: PropTypes.object,
    onChange: PropTypes.func,
    onHoverChange: PropTypes.func
  }
  constructor(props) {
    super(props);
    let value;
    if (!('value' in props)) {
      value = props.defaultValue;
    } else {
      value = props.value;
    }
    this.state = {
      value,
      number: value
    }
  }
  componentWillReceiveProps(nextProps) {
    let value;
    if ('value' in nextProps) {
      value = nextProps.value;
      this.setState({value});
    }
  }
  onClick = (event, index) => {
    const { allowHalf, onChange, disabled } = this.props;
    if (disabled) return;
    const el = this.getDOMNode(index);
    const left = event.pageX - getOffsetLeft(el);
    const width = el.offsetWidth;
    const isHalf = left < width / 2;
    const number = allowHalf && isHalf ? (index - 0.5) : index;
    if (!('value' in this.props)) {
      this.setState({value: number});
    };
    this.setState({number})
    if (onChange) {
      onChange(number, number);
    }
  }
  onMouseOver = (event, index) => {
    const { allowHalf, onHoverChange, disabled } = this.props;
    if (disabled) return;
    const { value } = this.state;
    const el = this.getDOMNode(index);
    const left = event.pageX - getOffsetLeft(el);
    const width = el.offsetWidth;
    const isHalf = left < width / 2;
    const number = allowHalf && isHalf ? (index - 0.5) : index;
    this.setState({number});
    if (onHoverChange) {
      onHoverChange(value, number);
    }
  }
  onMouseOut = () => {
    const { disabled } = this.props;
    if (disabled) return;
    const { value } = this.state;
    this.setState({number: value});
  }
  getClassName = index => {
    const { disabled } = this.props;
    const { number } = this.state;
    let classname = '';
    if (index < number) {
      classname = `${prefixCls}-star-full`;
    } else if (index >= number) {
      if (index === number) {
        classname = `${prefixCls}-star-full`;
      } else if (number > index - 1) {
        classname = `${prefixCls}-star-half`;
      }
    }
    return cn(`${prefixCls}-star`, classname, {
      [`${prefixCls}-star-disabled`]: disabled
    })
  }
  getDOMNode = (index) => {
    return ReactDOM.findDOMNode(this.refs[`star-${index}`]);
  }
  render() {
    const { className, style, disabled, count, character } = this.props;
    const classnames = cn(prefixCls, className, {
      [`${prefixCls}-disabled`]: disabled
    });
    const st = Object.assign({}, style);
    const stars = [];
    for (let i = 1; i <= count; i++) {
      stars.push(
        <div ref={`star-${i}`} className={this.getClassName(i)} key={i} onClick={e => this.onClick(e, i)} onMouseOver={e => this.onMouseOver(e, i)} onMouseOut={this.onMouseOut}>
          <div className={`${prefixCls}-star-left`}>{character}</div>
          <div className={`${prefixCls}-star-all`}>{character}</div>
        </div>
      )
    }
    return (
      <div className={classnames} style={st}>
        {stars}
      </div>
    )
  }
}

export default Rate;
