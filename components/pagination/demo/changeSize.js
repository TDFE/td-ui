import React from 'react';
import Pagination from '../index';
function onShowSizeChange(current, pageSize) {
  console.log(current, pageSize);
}
export default class ChangeSize extends React.Component {
  render() {
    return (
      <Pagination showSizeChanger onShowSizeChange={onShowSizeChange} defaultCurrent={3} total={500} />
    )
  }
}
