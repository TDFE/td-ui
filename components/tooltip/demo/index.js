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
  const text = <span>prompt text</span>;


  function Demo() {
    return (
      <div style={{paddingLeft: '40px', paddingTop: '20px', display: 'inline-block'}}>
        <div >
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
        <div id="components-tooltip-demo-placement" style={{padding: '300px'}}>
          <div style={{ marginLeft: 60 }}>
            <Tooltip placement="topLeft" title={text}>
              <a href="#">TL</a>
            </Tooltip>
            <Tooltip placement="top" title={text}>
              <a href="#">Top</a>
            </Tooltip>
            <Tooltip placement="topRight" title={text}>
              <a href="#">TR</a>
            </Tooltip>
          </div>
          <div style={{ width: 60, float: 'left' }}>
            <Tooltip placement="leftTop" title={text}>
              <a href="#">LT</a>
            </Tooltip>
            <Tooltip placement="left" title={text}>
              <a href="#">Left</a>
            </Tooltip>
            <Tooltip placement="leftBottom" title={text}>
              <a href="#">LB</a>
            </Tooltip>
          </div>
          <div style={{ width: 60, marginLeft: 270 }}>
            <Tooltip placement="rightTop" title={text}>
              <a href="#">RT</a>
            </Tooltip>
            <Tooltip placement="right" title={text}>
              <a href="#">Right</a>
            </Tooltip>
            <Tooltip placement="rightBottom" title={text}>
              <a href="#">RB</a>
            </Tooltip>
          </div>
          <div style={{ marginLeft: 60, clear: 'both' }}>
            <Tooltip placement="bottomLeft" title={text}>
              <a href="#">BL</a>
            </Tooltip>
            <Tooltip placement="bottom" title={text}>
              <a href="#">Bottom</a>
            </Tooltip>
            <Tooltip placement="bottomRight" title={text}>
              <a href="#">BR</a>
            </Tooltip>
          </div>
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
