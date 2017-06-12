/**
 * Created by wxy on 2017/6/7.
 */
/**
 * Created by Session on 17/6/1.
 */
/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import message from '../index';

const MOUNT_NODE = document.getElementById('app');

function getInfoMessage(){
  message.info('info message');
}

function getWarnMessage(){
  message.warning('warning test message');
}

let render = () => {
  /* eslint-disable*/
  // let Notification = require('../index').default;
  ReactDOM.render(
    <div>
      <button onClick={ getInfoMessage }>info show</button>
      <button onClick={ getWarnMessage }>warn show</button>
    </div>
    , MOUNT_NODE);
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
    })
  })
}