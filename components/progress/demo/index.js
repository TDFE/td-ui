/**
 * @Author: Yingxi.Hao <yzf>
 * @Date:   2017-06-20
 * @Last modified by:   hyx
 * @Last modified time: 2017-06-23
 */
import React from 'react';
import ReactDOM from 'react-dom';

const MOUNT_NODE = document.getElementById('app');

let render = () => {
  let Progress = require('../index').default;
  function Demo() {
    return (
      <div className="td">
        <p>line</p>
        <Progress type="line" status="success"/>
        <br/>
        <Progress type="line" percent={20} width={40}/>
        <br/>
        <Progress type="line" percent={30} width={500}/>
        <br/>
        <Progress type="line" status="success" percent={40}/>
        <br/>
        <Progress type="line" status="exception" percent={50}/>
        <p>stripe</p>
        <Progress type="stripe"/>
        <br/>
        <Progress type="stripe" percent={20}/>
        <br/>
        <Progress type="stripe" percent={30}/>
        <br/>
        <Progress type="stripe" status="success" percent={100}/>
        <br/>
        <Progress type="stripe" status="exception" percent={50}/>
        <p>circle</p>
        <Progress type="circle"/>
        <Progress type="circle" percent={20} width={300}/>
        <Progress type="circle" percent={30} width={50}/>
        <Progress type="circle" status="success" percent={100} width={500}/>
        <Progress type="circle" status="exception" percent={50}/>
        <Progress type="circle" status="exception" percent={70}/>
        <Progress type="circle" status="exception" percent={80}/>
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
