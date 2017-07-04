/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-07-04 10:44:57
 * @Last modified by:   yzf
 * @Last modified time: 2017-07-04 10:45:01
 */

import React from 'react';
import { ColumnGroup } from './base';

export function flatArray(data = [], childrenName = 'children') {
  const result = [];
  const loop = (array) => {
    array.forEach(item => {
      const newItem = Object.assign({}, item);
      delete newItem[childrenName];
      result.push(newItem);
      if (item[childrenName] && item[childrenName].length > 0) {
        loop(item[childrenName]);
      }
    });
  };
  loop(data);
  return result;
}

export function treeMap(tree, mapper, childrenName = 'children') {
  return tree.map((node, index) => {
    const extra = {};
    if (node[childrenName]) {
      extra[childrenName] = treeMap(node[childrenName], mapper, childrenName);
    }
    return Object.assign({}, mapper(node, index), extra);
  });
}

export function flatFilter(tree, callback) {
  return tree.reduce((acc, node) => {
    if (callback(node)) {
      acc.push(node);
    }
    if (node.children) {
      const children = flatFilter(node.children, callback);
      acc.push(...children);
    }
    return acc;
  }, []);
}

export function normalizeColumns(elements) {
  const columns = [];
  React.Children.forEach(elements, (element) => {
    if (!React.isValidElement(element)) {
      return;
    }
    const column = Object.assign({}, element.props);
    if (element.key) {
      column.key = element.key;
    }
    if (element.type === ColumnGroup) {
      column.children = normalizeColumns(column.children);
    }
    columns.push(column);
  });
  return columns;
}
