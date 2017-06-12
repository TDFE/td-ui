function getDomKeys (domArr = [], parentKey = '') {
  console.log(domArr);
  let back = domArr.map(item => {
    const type = item.type.displayName;
    if (item.props && item.propschildren) {

    } else{
      return
    }
  });;
  return back;
}

function checkSelected (domKeys, checkKey, selectedKey) {
  console(1);
}

export {
  getDomKeys,
  checkSelected
}
