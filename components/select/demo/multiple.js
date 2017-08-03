import React from 'react';
import Select from '../index';
const Option = Select.Option;
const OptGroup = Select.OptGroup;

export default class Multiple extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'],
      value: ['10', '20']
    }
  }
  handleChange = value => {
    this.setState({value});
  }
  render() {
    const value = this.state.value;
    const arr = this.state.arr;
    return (
      <div>
        <Select mode='multiple' placeholder='请选择' style={{ width: 250 }} value={value} onChange={this.handleChange}>
          {
            arr.map((item, index) => <Option value={item} key={item}>{item}条／页</Option>)
          }
        </Select>
        <Select mode='multiple' placeholder='请选择' style={{marginTop: '20px', width: '300px'}}>
          <OptGroup label="Manager">
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
          </OptGroup>
          <OptGroup label="Engineer">
            <Option value="Yiminghe">yiminghe</Option>
            <Option value="Yiminghe1">yiminghe1</Option>
          </OptGroup>
        </Select>
      </div>
    )
  }
}
