/* eslint-disable  */
import React from 'react';
import Select from '../index';
import jsonp from 'fetch-jsonp';
import querystring from 'querystring';
const Option = Select.Option;

let timeout;
let currentValue;

function fetch(value, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  function fake() {
    const str = querystring.encode({
      code: 'utf-8',
      q: value
    });
    jsonp(`https://suggest.taobao.com/sug?${str}`)
      .then(response => response.json())
      .then((d) => {
        if (currentValue === value) {
          const result = d.result;
          const data = [];
          result.forEach((r) => {
            data.push({
              value: r[0],
              text: r[0]
            });
          });
          callback(data);
        }
      });
  }

  timeout = setTimeout(fake, 300);
}

export default class Combobox extends React.Component {
  state = {
    data: [],
    value: undefined
  }
  handleChange = (value) => {
    this.setState({ value });
    console.log(value);
    fetch(value, data => this.setState({ data }));
  }
  render() {
    const options = this.state.data.map(d => <Option value={d.value} key={d.value}>{d.text}</Option>);
    return (
      <Select mode="combobox" showSearch showArrow={false} value={this.state.value} placeholder='请输入' style={{ width: 120 }} onChange={this.handleChange}>
         {options}
      </Select>
    )
  }
}
