import React from 'react';
import ReactDOM from 'react-dom';

const MOUNT_NODE = document.getElementById('app');

let render = () => {
  /* eslint-disable no-unused-vars */
  let Tabs = require('../index').default;
  const TabPane = Tabs.TabPane;
  /* eslint-disable no-unused-vars */
  function Demo() {
    return (
      <div className="td" style={{width: 450, height: 200, padding: 30}}>
        <Tabs activeKey="1">
          <TabPane key="1" tab="tab1">Tab1</TabPane>
          <TabPane key="2" tab="tab2">Tab2</TabPane>
          <TabPane key="3" tab="tab3">Tab3</TabPane>
        </Tabs>
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
