import React from 'react';
export function toArray(value) {
  let newValue = value;
  if (value === undefined) {
    newValue = [];
  } else if (!Array.isArray(value)) {
    newValue = [value];
  }
  return newValue;
}

export function getValuePropValue(child) {
  const props = child.props;
  if ('value' in props) {
    return props.value;
  }
  if (child.key) {
    return child.key;
  }
  if (child.props.isSelectOptGroup && props.label) {
    return props.label;
  }
}

export function getPropValue(child, props) {
  if (props === 'value') {
    return getValuePropValue(child);
  }
  return child.props[props];
}

export function isCombobox(props) {
  return props.mode === 'combobox';
}

export function isMultipleOrTags(props) {
  return props.mode === 'multiple' || props.mode === 'tags';
}

export function isMultipleOrTagsOrCombobox(props) {
  return isCombobox(props) || isMultipleOrTags(props);
}

export function isSingleMode(props) {
  return !isMultipleOrTagsOrCombobox(props);
}

export function getSelectedKeys(menuItems, value) {
  // if (value === null || value === undefined) {
  //   return [];
  // }
  let selectedKeys = [];
  React.Children.forEach(menuItems, item => {
  });
  return selectedKeys;
}

function loop(childs, obj) {
  React.Children.forEach(childs, child => {
    if (child.props.isSelectOptGroup) {
      obj[child.props.label] = {};
      loop(child.props.children, obj[child.props.label]);
    } else {
      let key;
      if ('value' in child.props) {
        key = child.props.value;
      } else if ('key' in child.props) {
        key = child.props.key;
      }
      if (typeof child.props.children === 'object') {
        obj[key] = child.props.children.join('');
      } else {
        obj[key] = child.props.children || '';
      }
    }
  });
  return obj;
}

export function getAllChildren(children) {
  let framework = loop(children, {});
  return framework;
}
