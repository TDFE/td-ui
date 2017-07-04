/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-07-03 10:02:38
 * @Last modified by:   yzf
 * @Last modified time: 2017-07-03 10:02:40
 *
 * a fork of rc-table
 */

import React from 'react';
import PropTypes from 'prop-types';
import shallowequal from 'shallowequal';

export default class TableHeader extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    rowStyle: PropTypes.object,
    rows: PropTypes.array
  }

  shouldComponentUpdate(nextProps) {
    return !shallowequal(nextProps, this.props);
  }

  render() {
    const { prefixCls, rowStyle, rows } = this.props;
    return (
      <thead className={`${prefixCls}-thead`}>
        {
          rows.map((row, index) => (
            <tr key={index} style={rowStyle}>
              {row.map((cellProps, i) => <th {...cellProps} key={i} />)}
            </tr>
          ))
        }
      </thead>
    );
  }
}
