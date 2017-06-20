/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Options extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.pageSize
    }
  }
  onChange = e => {
    const ref = this.refs.select;
    const value = ref.value;
    this.setState({value});
    this.props.onShowSizeChange(parseInt(value));
  }
  render() {
    const { prefixCls, pageSizeOptions } = this.props;
    const { value } = this.state;
    return (
      <div className={prefixCls}>
        <select value={value} onChange={this.onChange} ref='select'>
          {
            pageSizeOptions.map((item, index) => <option value={item} key={index}>{item}</option>)
          }
        </select>
      </div>
    )
  }
}

export default Options;
