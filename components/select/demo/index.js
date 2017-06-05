/**
 * Created by Session on 17/5/31.
 */
/* eslint-disable  */
import React from 'react';
import ReactDOM from 'react-dom';

const MOUNT_NODE = document.getElementById('app');

let render = () => {
    let Select = require('../index').default;
    ReactDOM.render(<Select></Select>, MOUNT_NODE);
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
