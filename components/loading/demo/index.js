/**
 * Created by Session on 17/6/1.
 */
/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';

const MOUNT_NODE = document.getElementById('app');

let render = () => {
    /* eslint-disable*/
    let Loading = require('../index').default;
    let bool= true;
    setTimeout(()=>{
        bool=false;
    },1000);
    ReactDOM.render(
        <Loading text="加载中..." size="large" loading={bool}>
            <div>
                内容
            </div>
        </Loading>, MOUNT_NODE);
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
