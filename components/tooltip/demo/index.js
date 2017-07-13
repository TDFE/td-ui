/**
 * Created by kongliang on 19/06/2017.
 */
import React from 'react';
import ReactDOM from 'react-dom';

const MOUNT_NODE = document.getElementById('app');

let render = () => {
  let Tooltip = require('../index').default;

  const content = (
    <div>
      <p>Content1</p>
      <p>Content2</p>
    </div>
  );

  function Demo() {
    return (
      <div style={{paddingLeft: '40px', paddingTop: '20px', display: 'inline-block'}}>
        <Tooltip content={content} title="this is title" placement="leftTop">
          <p>MOUSE OVER ME!</p>
        </Tooltip>

        <Tooltip content="just a simple word" style={{marginLeft: 100, display: 'inline-block'}} trigger="click" placement="bottom">
          <p>CLICK ME!</p>
        </Tooltip>
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
