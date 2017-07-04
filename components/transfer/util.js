import _ from 'lodash';

// 生成 dataSource 内部结构
const loopDataSource = (list, index) => {
  _.each(list, (item, i) => {
    const _key = index ? `${index}-${i}` : `${i}`;
    item._key = _key;
    if (item.children && item.children.length > 0) {
      item.children = loopDataSource(item.children, _key)
    }
  })
  return list
}
export function getInnerDataSource (dataSource) {
  return loopDataSource(_.cloneDeep(dataSource))
}

// 获取 source target 数据
const loopListData = (list, value, type) => {
  const back = [];
  _.each(list, (item, i) => {
    let children = false;
    const obj = Object.assign({}, item, {children: null});
    if (item.children && item.children.length > 0) {
      children = loopListData(item.children, value, type);
      if (children.length > 0) {
        obj.children = children;
      } else {
        delete obj.children
      }
    }
    if (obj.children || (value.indexOf(obj.key) >= 0 && type === 'target') || (value.indexOf(obj.key) < 0 && type === 'source')) {
      back.push(obj);
    }
  })
  return back
}
export function getListData (dataSource, value) {
  return {
    source: loopListData(dataSource, value, 'source'),
    target: loopListData(dataSource, value, 'target')
  }
}

// 校验子集是否有选中
export function checkChildren (children, value) {
  let back = false;
  _.each(children, item => {
    if (_.includes(value, item.key)) {
      back = true;
    }
    if (item.children) {
      const childBack = checkChildren(item.children, value);
      childBack && (back = true);
    }
  })
  return back
}
// 校验子集是否全部选中
export function checkChildrenAllSelected (children, value) {
  let back = true;
  _.each(children, item => {
    if (!_.includes(value, item.key)) {
      back = false;
    }
  })
  return back
}

// 获取嵌套数据长度
export function getLength (list) {
  let back = list.length;
  if (back > 0) {
    _.each(list, item => {
      item.children && (back += getLength(item.children))
    })
  }
  return back;
}

// 获取所有节点的key
export function getAllKey (list) {
  let back = [];
  if (list.length > 0) {
    _.each(list, item => {
      back.push(item.key);
      item.children && (back = back.concat(getAllKey(item.children)))
    })
  }
  return back;
}
