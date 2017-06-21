import React from 'react';
// 判断两个数组的值是否相等
export function arrEqual(arr, brr) {
  return Array.isArray(arr) && Array.isArray(brr) && arr.join('') === brr.join('');
}

// 判断每个节点是否有子节点，返回其子节点的个数
function getChildLength(child) {
  let len = 0;
  const children = child.props.children;
  if (Array.isArray(children)) {
    len = children.length;
  } else if (children) {
    len = 1;
  }
  return len;
}

// 循环所有的子节点
export function loopAllChildren(childrens, cb) {
  const loop = (children, level) => {
    React.Children.forEach(children, (child, index) => {
      const pos = `${level}-${index}`;
      let len = getChildLength(child);
      if (child.props.children && child.type && child.type.isTreeNode) {
        loop(child.props.children, pos);
      }
      cb(child, index, child.key || pos, pos, len);
    });
  };
  loop(childrens, 0);
}

/* eslint-disable no-unused-vars */
// 匹配所有子节点，置为不选中
export function getAllChildUnchecked(obj, index, pos, checkedKeys, halfCheckedKeys) {
  const objKeys = Object.keys(obj);
  for (let i = 0; i < index; i++) {
    const childPos = objKeys[i]; // 子节点pos
    const regExp = new RegExp('^' + pos, 'g');
    if (!regExp.test(childPos)) continue;
    const child = obj[childPos]; // 子节点
    const childKey = child.key; // 子节点key
    const checkedIndex = checkedKeys.indexOf(childKey);
    const halfCheckedIndex = halfCheckedKeys.indexOf(childKey);
    child.checked = false;
    child.halfChecked = false;
    if (checkedIndex !== -1) {
      checkedKeys.splice(checkedIndex, 1);
    }
    if (halfCheckedIndex !== -1) {
      halfCheckedKeys.splice(halfCheckedIndex, 1);
    }
  }
}
/* eslint-disable no-unused-vars */
// 匹配所有子节点，置为选中
export function getAllChildChecked(obj, index, pos, checkedKeys, halfCheckedKeys) {
  const objKeys = Object.keys(obj);
  for (let i = 0; i < index; i++) {
    const childPos = objKeys[i]; // 子节点pos
    const regExp = new RegExp('^' + pos, 'g');
    if (!regExp.test(childPos)) continue;
    const child = obj[childPos]; // 子节点
    const childKey = child.key; // 子节点key
    const checkedIndex = checkedKeys.indexOf(childKey);
    const halfCheckedIndex = halfCheckedKeys.indexOf(childKey);
    child.checked = true;
    child.halfChecked = false;
    if (checkedIndex === -1) {
      checkedKeys.push(childKey);
    }
    if (halfCheckedIndex !== -1) {
      halfCheckedKeys.splice(halfCheckedIndex, 1);
    }
  }
}
/* eslint-disable no-unused-vars */
// 匹配所有父节点，置为选中或半选中
export function getAllParentChecked(obj, pos, checkedKeys, halfCheckedKeys) {
  const loop = zIndex => {
    const level = zIndex.split('-');
    level.splice(level.length - 1, 1);
    const parentPos = level.join('-'); // 父节点pos
    if (!obj[parentPos]) return;
    const parent = obj[parentPos]; // 父节点
    const parentKey = parent.key; // 父节点key
    const parentLen = parent.len; // 父节点直属子节点个数
    const parentIndex = checkedKeys.indexOf(parentKey);
    const parentHalfIndex = halfCheckedKeys.indexOf(parentKey);
    let count = 0;
    if (parentIndex === -1) { // 如果父节点是选中的，则直接再向上寻找父节点
      for (let i = 0; i < parentLen; i++) { // 通过父节点找到所有兄弟节点
        const siblingPos = `${parentPos}-${i}`;
        const sibling = obj[siblingPos];
        const siblingKey = sibling.key;
        const siblingIndex = checkedKeys.indexOf(siblingKey);
        const siblingHalfIndex = halfCheckedKeys.indexOf(siblingKey);
        if (!sibling.checked || sibling.halfChecked) { // 说明兄弟节点有未选中的或半选中的，此时父节点应置为半选中
          if (!parent.halfChecked) {
            halfCheckedKeys.push(parentKey);
          }
          parent.halfChecked = true;
          break;
        }
        count++;
      }
      if (count === parentLen) { // 说明兄弟节点全部选中，此时父节点应置为选中
        parent.checked = true;
        parent.halfChecked = false;
        if (parentHalfIndex !== -1) {
          halfCheckedKeys.splice(parentHalfIndex, 1);
        }
        checkedKeys.push(parentKey);
      }
    }
    loop(parentPos);
  };
  loop(pos);
}

/* eslint-disable no-unused-vars */
// 匹配所有父节点，置为不选中或半选中
export function getAllParentUnchecked(obj, pos, checkedKeys, halfCheckedKeys) {
  const loop = zIndex => {
    const level = zIndex.split('-');
    level.splice(level.length - 1, 1);
    const parentPos = level.join('-'); // 父节点
    if (!obj[parentPos]) return;
    const parent = obj[parentPos]; // 父节点pos
    const parentKey = parent.key; // 父节点key
    const parentLen = parent.len; // 父节点直属子节点个数
    const parentIndex = checkedKeys.indexOf(parentKey);
    const parentHalfIndex = halfCheckedKeys.indexOf(parentKey);
    let count = 0;
    // 父节点不选中
    if (parent.checked) {
      parent.checked = false;
      checkedKeys.splice(parentIndex, 1);
    }
    parent.checked = false;
    for (let i = 0; i < parentLen; i++) { // 通过父节点找到所有兄弟节点
      const siblingPos = `${parentPos}-${i}`;
      const sibling = obj[siblingPos];
      const siblingKey = sibling.key;
      const checkedIndex = checkedKeys.indexOf(siblingKey);
      const halfCheckedIndex = halfCheckedKeys.indexOf(siblingKey);
      if (sibling.checked || sibling.halfChecked) { // 说明兄弟节点有选中的或半选中的，此时父节点应置为半选中
        if (!parent.halfChecked) {
          halfCheckedKeys.push(parentKey);
        }
        parent.halfChecked = true;
        break;
      }
      count++;
    }
    if (count === parentLen && parentIndex === -1) { // 说明兄弟节点全部未选中，此时父节点应置为未选中
      parent.halfChecked = false;
      if (parentHalfIndex !== -1) {
        halfCheckedKeys.splice(parentHalfIndex, 1);
      }
    }
    loop(parentPos);
  };
  loop(pos);
}
