/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-06-22 11:44:29
 * @Last modified by:   yzf
 * @Last modified time: 2017-06-26 14:00:11
 */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import chunk from 'lodash/chunk';

function isSameYear(one, two) {
  return one && two && one.isSame(two, 'year');
}

function getYears(value) {
  const min = Math.floor(value.year() / 10) * 10 - 1;
  const max = Math.ceil(value.year() / 10) * 10;
  const years = [];
  for (let i = min; i <= max; i++) {
    const year = value.clone().year(i);
    years.push(year);
  }
  return years;
}

export default class YearTable extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string.isRequired,
    value: PropTypes.object,
    onSelect: PropTypes.func.isRequired
  };

  renderBody() {
    const { value, onSelect, prefixCls, disabledDate } = this.props;
    const years = getYears(value);
    const yearTable = chunk(getYears(value), 4);
    const cellClass = `${prefixCls}-cell`;
    const curYearClass = `${prefixCls}-cur`;
    const selectedClass = `${prefixCls}-selected`;
    const disabledClass = `${prefixCls}-disabled-cell`;
    const minorClass = `${prefixCls}-minor`;

    const rows = [];
    for (let i = 0, passed = 0; i < yearTable.length; i++) {
      const yearCells = [];
      for (let j = 0; j < yearTable[i].length; j++) {
        const current = years[passed];
        let cls = cellClass;
        let disabled = false;
        if (isSameYear(current, value)) {
          cls += ` ${selectedClass}`;
        }
        if (isSameYear(current, moment())) {
          cls += ` ${curYearClass}`;
        }
        if (passed === 0 || passed === years.length - 1) {
          cls += ` ${minorClass}`;
        }
        if (disabledDate && disabledDate(current, value)) {
          disabled = true;
          cls += ` ${disabledClass}`;
        }

        yearCells.push(
          <td
            key={passed}
            onClick={disabled ? undefined : onSelect.bind(null, current)}
            title={current.year()}
            className={cls}
            >
            <div>
              {current.year()}
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
          {yearCells}
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
