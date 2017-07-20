/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-06-22 11:44:19
 * @Last modified by:   yzf
 * @Last modified time: 2017-06-26 13:59:54
 */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import chunk from 'lodash/chunk';

function isSameMonth(one, two) {
  return one && two && one.isSame(two, 'month');
}

export default class MonthTable extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string.isRequired,
    value: PropTypes.object,
    onSelect: PropTypes.func.isRequired
  };

  renderBody() {
    const { value, onSelect, prefixCls, disabledDate } = this.props;
    const months = chunk(moment.months(), 4);
    const cellClass = `${prefixCls}-cell`;
    const curMonthClass = `${prefixCls}-cur`;
    const selectedClass = `${prefixCls}-selected`;
    const disabledClass = `${prefixCls}-disabled-cell`;

    const rows = [];
    for (let i = 0, passed = 0; i < months.length; i++) {
      const monthCells = [];
      for (let j = 0; j < months[i].length; j++) {
        const current = value.clone().month(passed);
        let cls = cellClass;
        let disabled = false;
        if (isSameMonth(current, value)) {
          cls += ` ${selectedClass}`;
        }
        if (isSameMonth(current, moment())) {
          cls += ` ${curMonthClass}`;
        }
        if (disabledDate && disabledDate(current, value)) {
          disabled = true;
          cls += ` ${disabledClass}`;
        }

        monthCells.push(
          <td
            key={passed}
            onClick={disabled ? undefined : onSelect.bind(null, current)}
            title={current.format('YYYY/MM')}
            className={cls}
            >
            <div>
              {months[i][j]}
            </div>
          </td>
        );
        passed++;
      }
      rows.push(
        <tr key={`${i}-holder`} className={`${prefixCls}-placeholder`} />
      );
      rows.push(
        <tr key={i}>
          {monthCells}
        </tr>
      );
    }
    rows.push(
      <tr key="last-holder" className={`${prefixCls}-placeholder`} />
    );
    return (
      <tbody className={`${prefixCls}-tbody`}>{rows}</tbody>
    );
  }

  render() {
    const { prefixCls } = this.props;
    return (
      <table className={prefixCls} cellSpacing="0" cellPadding="0">
        {
          this.renderBody()
        }
      </table>
    );
  }
}
