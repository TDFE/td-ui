/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-07-03 09:52:08
 * @Last modified by:   yzf
 * @Last modified time: 2017-07-03 09:52:09
 *
 * a fork of rc-table
 */

import Table from './Table';
import Column from './Column';
import ColumnGroup from './ColumnGroup';

Table.Column = Column;
Table.ColumnGroup = ColumnGroup;

export default Table;
export { Column, ColumnGroup };
