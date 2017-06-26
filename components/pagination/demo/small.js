import React from 'react';
import Pagination from '../index';
function showTotal(total) {
  return `Total ${total} items`;
}
export default class Small extends React.Component {
  render() {
    return (
      <div>
        <Pagination size="small" total={50} />
        <Pagination size="small" total={50} showSizeChanger showQuickJumper />
        <Pagination size="small" total={50} showTotal={showTotal} />
      </div>
    )
  }
}
