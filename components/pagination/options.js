/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Options extends Component {
  onChange = e => {
  }
  render() {
    const { prefixCls, pageSizeOptions } = this.props;
    return (
      <div className={prefixCls}>
        <select onChange={this.onChange}>
          {
            pageSizeOptions.map(item => <option key={item} value={item}>{item}条/页</option>)
          }
        </select>
      </div>
    )
  }
}

export default Options;
