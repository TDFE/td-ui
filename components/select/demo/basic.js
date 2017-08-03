import React from 'react';
import Select from '../index';
const Option = Select.Option;

export default class Basic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: ['10', '20', '30'],
      value: '10'
    }
  }
  handleChange = value => {
    this.setState({value});
  }
  render() {
    const { value, arr } = this.state;
    return (
      <Select placeholder='请选择' style={{ width: 120 }} value={value} size='small' onChange={this.handleChange}>
        {
          arr.map((item, index) => <Option value={item} key={item}>{item}条／页</Option>)
        }
      </Select>
    )
  }
}
