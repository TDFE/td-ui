/**
 * Created by sunxianxiong on 17/6/28.
 */
/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import Checkbox from '../index';
let CheckboxGroup = Checkbox.CheckboxGroup;

const MOUNT_NODE = document.getElementById('app');
const plainOptions = [{label:"Tom",value:"Tom"},{label:"Sham",value:"Sham"},{label:"Jack",value:"Jack"},{label:"Mac",value:"Mac"}];
const defaultCheckedList = ["Tom","Sham"];

class Demo extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      checked:true,
      value:[1],
      valuea:["Tom","Mac"],
      valueb:["Mac"],
      checkedList: defaultCheckedList,
      indeterminate: true,
      checkAll: false,
    };
  }

  onChangeOne = e => {
    // this.setState({ checked: e.target.checked });
    console.log('checked:'+e.target.checked +',value:'+e.target.value)
  }
  onChangeOne1 = e => {
    this.setState({ checked: e.target.checked });
    console.log('checked:'+e.target.checked+',value:'+e.target.value)
  }

  onCheckboxGroupChangeValue = v => {
    console.log(v);
    this.setState({value:v})
  }

  onCheckboxGroupChange = v => {
      console.log(v);
  }
  onCheckboxGroupChangea = v => {
    console.log(v);
    this.setState({valuea:v})
  }
  onCheckboxGroupChangeb = v => {
    console.log(v);
    this.setState({valueb:v})
  }

  onChange = (checkedList) => {
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
      checkAll: checkedList.length === plainOptions.length
    });
  }
  onCheckAllChange = (e) => {
    this.setState({
      checkedList: e.target.checked ? plainOptions.map((op)=>{return op.value}) : [],
      indeterminate: false,
      checkAll: e.target.checked
    });
  }

  render() {
    let checkboxOptions1 = ["Tom","Sham","Jack","Mac"];
    let checkboxOptions2 = [{label:"Tom",value:"Tom"},{label:"Sham",value:"Sham",disabled:true},{label:"Jack",value:"Jack"},{label:"Mac",value:"Mac"}];
    return (
      <div className="td">
        <div><Checkbox onChange={this.onChangeOne} value="zhangsan" >张三</Checkbox></div>
        <div><Checkbox checked = {this.state.checked} onChange={this.onChangeOne1} value="lisi">李四</Checkbox></div>
        <div><Checkbox defaultChecked={true} onChange={this.onChangeOne} value="wangwu">王五</Checkbox></div>
        <div><Checkbox defaultChecked={false} onChange={this.onChangeOne} value="maliu">马六</Checkbox></div>
        <div><Checkbox disabled>Checkbox</Checkbox></div>
        <div><Checkbox disabled checked={true}>Checkbox</Checkbox></div>
        <div>
          <CheckboxGroup onChange={this.onCheckboxGroupChange}>
            <Checkbox value={1}>Checkbox1</Checkbox>
            <Checkbox value={2}>Checkbox2</Checkbox>
            <Checkbox value={3}>Checkbox3</Checkbox>
          </CheckboxGroup>
        </div>
        <div>
          <CheckboxGroup value={this.state.value} onChange={this.onCheckboxGroupChangeValue}>
            <Checkbox value={1}>Checkbox1</Checkbox>
            <Checkbox value={2}>Checkbox2</Checkbox>
            <Checkbox value={3}>Checkbox3</Checkbox>
          </CheckboxGroup>
        </div>
        <div>
          <CheckboxGroup defaultValue={[1]} onChange={this.onCheckboxGroupChange}>
            <Checkbox value={1}>Checkbox1</Checkbox>
            <Checkbox value={2}>Checkbox2</Checkbox>
            <Checkbox value={3}>Checkbox3</Checkbox>
          </CheckboxGroup>
        </div>
        <div>
          <CheckboxGroup value={[1]} defaultValue={[2]} disabled>
            <Checkbox value={1}>Checkbox1</Checkbox>
            <Checkbox value={2}>Checkbox2</Checkbox>
            <Checkbox value={3}>Checkbox3</Checkbox>
          </CheckboxGroup>
        </div>

        <div>
          <CheckboxGroup value={this.state.valuea} options={checkboxOptions1} onChange={this.onCheckboxGroupChangea}/>
        </div>
        <div>
          <CheckboxGroup value={this.state.valueb} options={checkboxOptions2} onChange={this.onCheckboxGroupChangeb}/>
        </div>

        <h6>全选demo</h6>
        <div>
          <div style={{ borderBottom: '1px solid #E9E9E9' }}>
            <Checkbox
              indeterminate={this.state.indeterminate}
              onChange={this.onCheckAllChange}
              checked={this.state.checkAll}
            >
              Check all
            </Checkbox>
          </div>
          <CheckboxGroup value={this.state.checkedList} options={plainOptions} onChange={this.onChange}/>
        </div>

      </div>
    );
  }
}

let render = () => {
  ReactDOM.render(<Demo />, MOUNT_NODE);
};

try {
  render();
} catch (e) {
  console.log(e);
}

if (module.hot) {
  module.hot.accept(['../index'], () => {
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(MOUNT_NODE);
      render();
    });
  });
}