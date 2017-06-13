/**
 * Created by Session on 17/5/31.
 */
/* eslint-disable  */
import React from 'react';
import ReactDOM from 'react-dom';

const MOUNT_NODE = document.getElementById('app');

let render = () => {
    let Select = require('../index').default;
    let Option = Select.Option;
    ReactDOM.render(<Select>
        <div>我是孩子</div>
        <Option>00</Option>
    </Select>, MOUNT_NODE);
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
