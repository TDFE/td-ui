/**
 * Created by wxy on 2017/6/29.
 */

import React from 'react';
import ReactDOM from 'react-dom';

const MOUNT_NODE = document.getElementById('app');

// showEnd 仅显示末端选项
// allowClear 是否支持清除
// hoverOpen 移入展开
let render = () => {
  let Slider = require('../index').default;
  ReactDOM.render(
    <div style={{padding: '20px'}}>
      <Slider
        axis='y'
        y={15}
        ymin={10}
        ymax={36}
        toFixed={2}
        showValue
      />
      <Slider
        axis='x'
        x={15}
        xmin={10}
        xmax={36}
        toFixed={2}
        style={{marginLeft: 20}}
        showValue
      />
    </div>
    , MOUNT_NODE
  );
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
