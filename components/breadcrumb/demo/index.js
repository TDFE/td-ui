import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
/* eslint-disable no-unused-vars */
import { Router, Route, Link, hashHistory } from 'react-router';
import Breadcrumb from './../Breadcrumb';
import BreadcrumbItem from './../BreadcrumbItem';

const MOUNT_NODE = document.getElementById('app');

const Apps = () => (
  <ul className="app-list">
    <li>
      <Link to="/apps/1">Application1</Link>：<Link to="/apps/1/detail">Detail</Link>
    </li>
    <li>
      <Link to="/apps/2">Application2</Link>：<Link to="/apps/2/detail/yc">Detail</Link>
    </li>
  </ul>
);
class Home extends React.Component {
  render() {
    const { routes, params, children } = this.props;
    console.log(this.props);
    return (
      <div className="demo">
        <div className="demo-nav">
          <Link to="/">Home</Link>
          <Link to="/apps">Application List</Link>
        </div>
        {children || '路由DEMO'}
        <Breadcrumb routes={routes} params={params} />
      </div>
    );
  }
}

let render = () => {
  ReactDOM.render(
    <div>
    <Router history={hashHistory}>
      <Route name="home" breadcrumbName="Home" path="/" component={Home}>
        <Route name="apps" breadcrumbName="Application List" path="apps" component={Apps}>
          <Route name="app" breadcrumbName="Application:id" path=":id">
            <Route name="detail" breadcrumbName="Detail :name" path="detail(/:name)" />
          </Route>
        </Route>
      </Route>
    </Router>

    <div>非路由DEMO</div>
    <Breadcrumb>
      <BreadcrumbItem>Home</BreadcrumbItem>
      <BreadcrumbItem><a href="#">Application Center</a></BreadcrumbItem>
      <BreadcrumbItem><a href="#">Application List</a></BreadcrumbItem>
      <BreadcrumbItem>An Application</BreadcrumbItem>
    </Breadcrumb>

    </div>
  , MOUNT_NODE);
}

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
