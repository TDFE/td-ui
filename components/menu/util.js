function isArray (obj) {
  return toString.call(obj) === '[object Array]';
}

function getKey (item, pKey, index) {
  if (item.key) {
    return item.key;
  } else {
    return `${pKey}-${index}`;
  }
}

function loopDom (back, dom, parentKey, index) {
  if (dom.props && dom.props.children && isArray(dom.props.children) && dom.props.children.length > 0) {
    const pKey = getKey(dom, parentKey, index);
    back[pKey] = dom.props.children.map((item, i) => {
      loopDom(back, item, pKey, i);
      return getKey(item, pKey, i);
    });
  }
}

function getDomKeys (domArr = []) {
  let back = {};
  for (var i = 0; i < domArr.length; i++) {
    let item = domArr[i];
    loopDom(back, item, 'root', i);
  }
  return back;
}

function getChildren(domKeys, eventKey) {
  let back = [];
  let find = domKeys[eventKey];
  if (find) {
    back = back.concat(find);
    for (var i = 0; i < find.length; i++) {
      back = back.concat(getChildren(domKeys, find[i]));
    }
  }
  return back;
}
function checkSelected (domKeys, selectedKeys, eventKey) {
  const child = getChildren(domKeys, eventKey);
  let isSelecetd = false;
  if (selectedKeys && selectedKeys.length > 0) {
    for (let i = 0; i < child.length; i++) {
      if (child[i].indexOf(selectedKeys) >= 0) {
        isSelecetd = true;
        break;
      }
    }
  }
  return isSelecetd;
}

export {
  getDomKeys,
  checkSelected
};
