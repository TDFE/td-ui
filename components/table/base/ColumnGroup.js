/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-07-03 09:59:36
 * @Last modified by:   yzf
 * @Last modified time: 2017-07-03 09:59:38
 *
 * a fork of rc-table
 */

import { Component } from 'react';
import PropTypes from 'prop-types';

export default class ColumnGroup extends Component {
  static propTypes = {
    title: PropTypes.node
  };

  static isTableColumnGroup = true;
}
