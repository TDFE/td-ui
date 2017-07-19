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
        <Tooltip overlayStyle={{color:'red'}} content={content} title="this is title" placement="leftTop" autoAdjustOverflow={true}>
          <p>MOUSE OVER ME!</p>
        </Tooltip>

        <Tooltip content="just a simple word" overlayStyle={{marginLeft: 100, display: 'inline-block'}} trigger="click" placement="right">
          <p>CLICK ME!</p>
        </Tooltip>

        <Tooltip content="I am always visible" overlayStyle={{marginLeft: 200, display: 'inline-block'}} placement="bottomLeft" visible={true}>
          <p>WATCH ME!</p>
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
