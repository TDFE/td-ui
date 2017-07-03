/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-07-03 14:20:48
 * @Last modified by:   yzf
 * @Last modified time: 2017-07-03 14:20:51
 */

import React from 'react';
import { findDOMNode } from 'react-dom';
import BaseTable from './base';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Pagination from '../pagination';
import Icon from '../icon';
import Loading from '../loading';
import warning from 'warning';
import FilterDropdown from './filterDropdwon';
import createStore, { Store } from './createStore';
import SelectionBox from './SelectionBox';
import SelectionCheckboxAll, { SelectionDecorator } from './SelectionCheckboxAll';
import Column from './Column';
import ColumnGroup from './ColumnGroup';
import { flatArray, treeMap, flatFilter, normalizeColumns } from './util';

function noop() {
}

function stopPropagation(e) {
  e.stopPropagation();
  if (e.nativeEvent.stopImmediatePropagation) {
    e.nativeEvent.stopImmediatePropagation();
  }
}

const defaultPagination = {
  onChange: noop,
  onShowSizeChange: noop
};

/**
 * 避免生成新对象，这样父组件的shouldComponentUpdate可以更好的起作用
 */
const emptyObject = {};

export default class Table extends React.Component {
  static Column = Column;
  static ColumnGroup = ColumnGroup;

  static propTypes = {
    dataSource: PropTypes.array,
    columns: PropTypes.array,
    prefixCls: PropTypes.string,
    useFixedHeader: PropTypes.bool,
    rowSelection: PropTypes.object,
    className: PropTypes.string,
    size: PropTypes.string,
    loading: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object
    ]),
    bordered: PropTypes.bool,
    onChange: PropTypes.func,
    locale: PropTypes.object,
    dropdownPrefixCls: PropTypes.string
  };

  static defaultProps = {
    dataSource: [],
    prefixCls: 'td-table',
    useFixedHeader: false,
    rowSelection: null,
    className: '',
    size: 'large',
    loading: false,
    bordered: false,
    indentSize: 20,
    locale: {},
    rowKey: 'key',
    showHeader: true
  };

  constructor(props) {
    super(props);
    this.columns = props.columns || normalizeColumns(props.children);

    this.state = assign({}, this.getSortStateFromColumns(), {
      // 减少状态
      filters: this.getFiltersFromColumns(),
      pagination: this.getDefaultPagination(props),
    });

    this.CheckboxPropsCache = {};

    this.store = createStore({
      selectedRowKeys: (props.rowSelection || {}).selectedRowKeys || [],
      selectionDirty: false
    });
  }
}
