/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
/* eslint-disable no-unused-vars */
import Icon from '../../icon';

const MOUNT_NODE = document.getElementById('app');

let render = () => {
  /* eslint-disable no-unused-vars */
  let Rate = require('../index').default;

  /* eslint-disable no-unused-vars */
  function Demo() {
    return (
      <div className="td" style={{marginLeft: '200px', paddingLeft: '200px'}}>
        <Rate />
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
