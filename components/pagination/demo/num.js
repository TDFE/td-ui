import React from 'react';
import Pagination from '../index';
export default class Num extends React.Component {
  render() {
    return (
      <Pagination defaultCurrent={1} showNum={3} total={150} />
    )
  }
}
