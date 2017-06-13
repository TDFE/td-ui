/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';

const MOUNT_NODE = document.getElementById('app');

let render = () => {
  /* eslint-disable no-unused-vars */
  let Pagination = require('../index').default;

  /* eslint-disable no-unused-vars */
  function Demo() {
    return (
      <div className="td">
        <Pagination showNum={5} showSizeChanger={true} total={99} showTotal={(total, range) => {
          return `${range[0]}-${range[1]} of ${total} items`
        }} onChange={(current, pageSize) => {
          console.log(current);
        }}/>
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
