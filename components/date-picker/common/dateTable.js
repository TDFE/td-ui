/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-06-22 11:44:08
 * @Last modified by:   yzf
 * @Last modified time: 2017-06-26 13:58:49
 */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

function isSameDay(one, two) {
  return one && two && one.isSame(two, 'day');
}

function beforeCurrentMonthYear(current, today) {
  if (current.year() < today.year()) {
    return 1;
  }
  return current.year() === today.year() &&
    current.month() < today.month();
}

function afterCurrentMonthYear(current, today) {
  if (current.year() > today.year()) {
    return 1;
  }
  return current.year() === today.year() &&
    current.month() > today.month();
}

export default class DateTable extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string.isRequired,
    value: PropTypes.object,
    onSelect: PropTypes.func.isRequired
  };

  renderHeader() {
    const { value } = this.props;
    const localeData = value.localeData();
    const veryShortWeekdays = [];
    const firstDayOfWeek = 0;
    const now = moment();
    for (let dateColIndex = 0; dateColIndex < 7; dateColIndex++) {
      const index = (firstDayOfWeek + dateColIndex) % 7;
      now.day(index);
      veryShortWeekdays[dateColIndex] = localeData.weekdaysMin(now);
    }

    return (
      <thead>
        <tr>
          {
            veryShortWeekdays.map((day, index) => <th key={index}><div>{day}</div></th>)
          }
        </tr>
      </thead>
    );
  }

  renderBody() {
    const { prefixCls, value, disabledDate, onSelect } = this.props;
    const month1 = value.clone();
    month1.date(1);
    const day = month1.day();
    const lastMonthDiffDay = (day + 7) % 7;
    // calculate last month
    const lastMonth1 = month1.clone();
    lastMonth1.add(0 - lastMonthDiffDay, 'days');

    const dateTable = [];
    for (let i = 0, passed = 0, current; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        current = lastMonth1;
        if (passed) {
          current = current.clone();
          current.add(passed, 'days');
        }
        dateTable.push(current);
        passed++;
      }
    }

    const cellClass = `${prefixCls}-cell`;
    const todayClass = `${prefixCls}-cur`;
    const selectedClass = `${prefixCls}-selected`;
    const lastMonthDayClass = `${prefixCls}-last-month-cell`;
    const nextMonthDayClass = `${prefixCls}-next-month-btn-day`;
    const disabledClass = `${prefixCls}-disabled-cell`;
    const firstDisableClass = `${prefixCls}-disabled-cell-first-of-row`;
    const lastDisableClass = `${prefixCls}-disabled-cell-last-of-row`;

    const today = moment();
    const rows = [];
    for (let i = 0, passed = 0, current; i < 6; i++) {
      const dateCells = [];
      for (let j = 0; j < 7; j++) {
        let next = null;
        let last = null;
        current = dateTable[passed];
        if (j < 6) {
          next = dateTable[passed + 1];
        }
        if (j > 0) {
          last = dateTable[passed - 1];
        }
        let cls = cellClass;
        let disabled = false;
        const isBeforeCurrentMonthYear = beforeCurrentMonthYear(current, value);
        const isAfterCurrentMonthYear = afterCurrentMonthYear(current, value);
        if (isSameDay(current, today)) {
          cls += ` ${todayClass}`;
        }
        if (isSameDay(current, value)) {
          cls += ` ${selectedClass}`;
        }

        if (isBeforeCurrentMonthYear) {
          cls += ` ${lastMonthDayClass}`;
        }
        if (isAfterCurrentMonthYear) {
          cls += ` ${nextMonthDayClass}`;
        }

        if (disabledDate) {
          if (disabledDate(current, value)) {
            disabled = true;

            if (!last || !disabledDate(last, value)) {
              cls += ` ${firstDisableClass}`;
            }

            if (!next || !disabledDate(next, value)) {
              cls += ` ${lastDisableClass}`;
            }
          }
        }

        if (disabled) {
          cls += ` ${disabledClass}`;
        }

        dateCells.push(
          <td
            key={passed}
            onClick={disabled ? undefined : onSelect.bind(null, current)}
            title={current.format('YYYY/MM/DD')}
            className={cls}
          >
            <div>
              {current.date()}
            </div>
          </td>
        );
        passed++;
      }
      rows.push(
        <tr key={i}>
          {dateCells}
        </tr>
      );
    }
    return (
      <tbody className={`${prefixCls}-tbody`}>{rows}</tbody>
    );
  }

  render() {
    const { prefixCls } = this.props;
    return (
      <table className={prefixCls} cellSpacing="0" cellPadding="0">
        {
          this.renderHeader()
        }
        {
          this.renderBody()
        }
      </table>
    );
  }
}
