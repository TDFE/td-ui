import React from 'react';
import Select from '../index';
const Option = Select.Option;

function handleChange(value) {
  console.log(`selected ${value}`);
}

export default class Basic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [10, 20, 30],
      value: 10
    }
  }
  handleChange = value => {
    this.setState({value});
  }
  render() {
    const value = this.state.value;
    const arr = this.state.arr;
    return (
      <Select value={value} style={{ width: 120 }} size='small' onChange={this.handleChange}>
        {
          arr.map((item, index) => <Option value={item} key={item}>{item}条／页</Option>)
        }
      </Select>
    )
  }
}
