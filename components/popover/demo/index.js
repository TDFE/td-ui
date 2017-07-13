/**
 * Created by kongliang on 19/06/2017.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Button from '../../button'

const MOUNT_NODE = document.getElementById('app');
const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);
const text = <span>Title</span>;

const buttonWidth = 70;

let render = () => {
  let Popover = require('../index').default;

  function Demo() {
    return (
      <div className="demo" style={{ marginLeft: '200px', marginTop: '200px' }}>
        <div style={{ marginLeft: buttonWidth, whiteSpace: 'nowrap' }}>
          <Popover placement="topLeft" title={text} content={content} trigger="click">
            <Button>TL</Button>
          </Popover>
          <Popover placement="top" title={text} content={content} trigger="click">
            <Button>Top</Button>
          </Popover>
          <Popover placement="topRight" title={text} content={content} trigger="click">
            <Button>TR</Button>
          </Popover>
        </div>
        <div style={{ width: buttonWidth, float: 'left' }}>
          <Popover placement="leftTop" title={text} content={content} trigger="click">
            <Button>LT</Button>
          </Popover>
          <Popover placement="left" title={text} content={content} trigger="click">
            <Button>Left</Button>
          </Popover>
          <Popover placement="leftBottom" title={text} content={content} trigger="click">
            <Button>LB</Button>
          </Popover>
        </div>
        <div style={{ width: buttonWidth, marginLeft: (buttonWidth * 4) + 24 }}>
          <Popover placement="rightTop" title={text} content={content} trigger="click">
            <Button>RT</Button>
          </Popover>
          <Popover placement="right" title={text} content={content} trigger="click">
            <Button>Right</Button>
          </Popover>
          <Popover placement="rightBottom" title={text} content={content} trigger="click">
            <Button>RB</Button>
          </Popover>
        </div>
        <div style={{ marginLeft: buttonWidth, clear: 'both', whiteSpace: 'nowrap' }}>
          <Popover placement="bottomLeft" title={text} content={content} trigger="click">
            <Button>BL</Button>
          </Popover>
          <Popover placement="bottom" title={text} content={content} trigger="click">
            <Button>Bottom</Button>
          </Popover>
          <Popover placement="bottomRight" title={text} content={content} trigger="click">
            <Button>BR</Button>
          </Popover>
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
