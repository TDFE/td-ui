/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-06-20 11:08:02
 * @Last modified by:   yzf
 * @Last modified time: 2017-06-20 11:08:04
 */

 import React from 'react';
 import ReactDOM from 'react-dom';

 const MOUNT_NODE = document.getElementById('app');

 let render = () => {
   let TimePicker = require('../index').default;

   function Demo() {
     return (
       <div className="td">
         <TimePicker />
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
