import React from 'react';
import PropTypes from 'prop-types';
import s from './style';
/* eslint-disable no-unused-vars */
import BreadcrumbItem from './BreadcrumbItem';
import classNames from 'classnames';
const { Component, Children, cloneElement } = React;

function getBreadcrumbName(route, params) {
  if (!route.breadcrumbName) {
    return null;
  }
  const paramsKeys = Object.keys(params).join('|');
  const name = route.breadcrumbName.replace(
    new RegExp(`:(${paramsKeys})`, 'g'),
    (replacement, key) => params[key] || replacement,
  );
  return name;
}

function defaultItemRender(route, params, routes, paths) {
  const isLastItem = routes.indexOf(route) === routes.length - 1;
  const name = getBreadcrumbName(route, params);

  return isLastItem
    ? <span>{name}</span>
    : <a href={`#/${paths.join('/')}`}>{name}</a>;
}

export default class Breadcrumb extends Component {
  static defaultProps = {
    prefixCls: s.breadcrumbPrefix,
    separator: '/'
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    separator: PropTypes.node,
    routes: PropTypes.array,
    params: PropTypes.object,
    linkRender: PropTypes.func,
    nameRender: PropTypes.func
  };

  render() {
    let crumbs;
    const {
      separator, prefixCls, style, className, routes, params = {},
      children, itemRender = defaultItemRender
    } = this.props;

    if (routes && routes.length > 0) {
      const paths = [];
      crumbs = routes.map((route) => {
        route.path = route.path || '';
        let path = route.path.replace(/^\//, '');
        Object.keys(params).forEach(key => {
          path = path.replace(`:${key}`, params[key]);
        });
        if (path) {
          paths.push(path);
        }
        return (
          <BreadcrumbItem separator={separator} key={route.breadcrumbName || path}>
            {itemRender(route, params, routes, paths)}
          </BreadcrumbItem>
        );
      });
    } else if (children) {
      crumbs = Children.map(children, (element, index) => {
        if (!element) {
          return element;
        }
        return cloneElement(element, {
          separator,
          key: index
        });
      });
    }
    return (
      <div className={classNames(className, prefixCls)} style={style}>
        {crumbs}
      </div>
    );
  }
}
