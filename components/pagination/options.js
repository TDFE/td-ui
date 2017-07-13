/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from '../select';
const Option = Select.Option;

class Options extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.pageSize
    }
  }
  onChange = value => {
    this.setState({value});
    this.props.onShowSizeChange(parseInt(value));
  }
  render() {
    const { prefixCls, pageSizeOptions, size } = this.props;
    const { value } = this.state;
    return (
      <div className={prefixCls}>
        <Select value={value} size={size} onChange={this.onChange} ref='select'>
          {
            pageSizeOptions.map((item, index) => <Option value={item} key={index}>{item}条／页</Option>)
          }
        </Select>
      </div>
    )
  }
}

export default Options;
