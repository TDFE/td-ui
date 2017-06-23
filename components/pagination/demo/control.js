import React from 'react';
import Pagination from '../index';
export default class Control extends React.Component {
  state = {
    current: 3
  }
  onChange = (page) => {
    console.log(page);
    this.setState({
      current: page
    });
  }
  render() {
    return <Pagination current={this.state.current} onChange={this.onChange} total={50} />;
  }
}
