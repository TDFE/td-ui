/**
 * Created by sunxianxiong on 17/6/1.
 */
/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';

const MOUNT_NODE = document.getElementById('app');

let render = () => {
  /* eslint-disable no-unused-vars */
  let Radio = require('../index').default;
  let RadioGroup = Radio.RadioGroup;

  function onChange(e) {
    console.log('checked radio value:' + e.target.value);
  }

  /* eslint-disable no-unused-vars */
  function Demo() {

    let radioOptions1 = ["Tom","Sham","Jack","Mac"];
    let radioOptions2 = [{label:"Tom",value:"Tom"},{label:"Sham",value:"Sham"},{label:"Jack",value:"Jack"},{label:"Mac",value:"Mac"}];

    return (
      <div className="td">
        <div><Radio>radio</Radio></div>
        <div><Radio checked>radio</Radio></div>
        <div><Radio checked={false}>radio</Radio></div>
        <div><Radio defaultChecked={true}>radio</Radio></div>
        <div><Radio defaultChecked={false}>radio</Radio></div>
        <div><Radio checked defaultChecked={false}>radio</Radio></div>
        <div><Radio disabled>radio</Radio></div>
        <div><Radio disabled checked={true}>radio</Radio></div>
        <div>
          <RadioGroup onChange={onChange}>
            <Radio value={1}>radio1</Radio>
            <Radio value={2}>radio2</Radio>
            <Radio value={3}>radio3</Radio>
          </RadioGroup>
        </div>
        <div>
          <RadioGroup value={1} onChange={onChange}>
            <Radio value={1}>radio1</Radio>
            <Radio value={2}>radio2</Radio>
            <Radio value={3}>radio3</Radio>
          </RadioGroup>
        </div>
        <div>
          <RadioGroup defaultValue={1} onChange={onChange}>
            <Radio value={1}>radio1</Radio>
            <Radio value={2}>radio2</Radio>
            <Radio value={3}>radio3</Radio>
          </RadioGroup>
        </div>
        <div>
          <RadioGroup value={1} defaultValue={2} disabled onChange={onChange}>
            <Radio value={1}>radio1</Radio>
            <Radio value={2}>radio2</Radio>
            <Radio value={3}>radio3</Radio>
          </RadioGroup>
        </div>
        <div>
          <RadioGroup value={11} defaultValue={2} direction="vertical" onChange={onChange}>
            <Radio value={11}>radio11</Radio>
            <Radio value={22}>radio22</Radio>
            <Radio value={33}>radio33</Radio>
          </RadioGroup>
        </div>

        <div>
          <RadioGroup value="Tom" options={radioOptions1} onChange={onChange}/>
        </div>
        <div>
          <RadioGroup value="Mac" options={radioOptions2} onChange={onChange}/>
        </div>
      </div>
    );
  }

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