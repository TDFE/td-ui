import React from 'react';
import ReactDOM from 'react-dom';
import Basic from './basic';
import ShowSearch from './showSearch';
import Group from './group';
import Combobox from './combobox';
import Multiple from './multiple';
const MOUNT_NODE = document.getElementById('app');
let render = () => {
  function Demo() {
    return (
      <div className="td">
        <Basic />
        <p>我是分隔线我是分隔线我是分隔线我是分隔线我是分隔线</p>
        <ShowSearch />
        <p>我是分隔线我是分隔线我是分隔线我是分隔线我是分隔线</p>
        <Group />
        <p>我是分隔线我是分隔线我是分隔线我是分隔线我是分隔线</p>
        <Combobox />
        <p>我是分隔线我是分隔线我是分隔线我是分隔线我是分隔线</p>
        <Multiple />
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
    })
  })
}
