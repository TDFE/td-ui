import React from 'react';
import Pagination from '../index';
function onChange(pageNumber) {
  console.log('Page: ', pageNumber);
}
export default class Jumper extends React.Component {
  render() {
    return (
      <Pagination showQuickJumper defaultCurrent={2} total={500} onChange={onChange} />
    )
  }
}
