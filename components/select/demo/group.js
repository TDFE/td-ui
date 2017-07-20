import React from 'react';
import Select from '../index';
const Option = Select.Option;
const OptGroup = Select.OptGroup;

export default class Group extends React.Component {
  state = {
    value: 'jack'
  }
  onChange = v => {
    this.setState({
      value: v
    })
  }
  render() {
    return (
      <Select placeholder='请选择' style={{ width: 200 }} showSearch value={this.state.value} onChange={this.onChange}>
         <OptGroup label="Manager">
           <Option value="jack">Jack</Option>
           <Option value="lucy">Lucy</Option>
         </OptGroup>
         <OptGroup label="Engineer">
           <Option value="Yiminghe">yiminghe</Option>
           <Option value="Yiminghe1">yiminghe1</Option>
         </OptGroup>
       </Select>
    )
  }
}
