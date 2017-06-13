/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class QuickJumper extends Component {
  static PropTypes = {
    prefixCls: PropTypes.string,
    allPages: PropTypes.number,
    current: PropTypes.number,
    onChange: PropTypes.func
  }
  constructor(props) {
    super(props);
    this.state = {
      value: props.current
    }
  }
  onChange = e => {
    this.setState({
      value: e.target.value
    })
  }
  onKeyUp = e => {
    let value = e.target.value;
    const { current, allPages } = this.props;
    const keyCode = e.keyCode;
    if (isNaN(value)) {
      value = current;
    }
    if (value === '') {
      return;
    }
    if (keyCode === 13) {
      value = parseInt(value);
      if (value !== current) {
        this.props.onChange(value > allPages ? allPages : value);
      } else {
        this.setState({value});
      }
    }
  }
  render() {
    const { prefixCls } = this.props;
    const { value } = this.state;
    return (
      <div className={prefixCls}>
        跳转至
        <input type='text' value={value} onChange={this.onChange} onKeyUp={this.onKeyUp}/>
        页
      </div>
    )
  }
}

export default QuickJumper;
