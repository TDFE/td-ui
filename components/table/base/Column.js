/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-07-03 09:58:54
 * @Last modified by:   yzf
 * @Last modified time: 2017-07-03 09:58:57
 *
 * a fork of rc-table
 */

import { Component } from 'react';
import PropTypes from 'prop-types';

export default class Column extends Component {
  static propTypes = {
    className: PropTypes.string,
    colSpan: PropTypes.number,
    title: PropTypes.node,
    dataIndex: PropTypes.string,
    width: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    fixed: PropTypes.oneOf([
      true,
      'left',
      'right',
    ]),
    render: PropTypes.func,
    onCellClick: PropTypes.func,
  }
}
