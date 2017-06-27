/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import assign from 'object-assign';
import s from './style';
import { arrEqual, loopAllChildren, getAllChildChecked, getAllChildUnchecked, getAllParentChecked, getAllParentUnchecked, getOffset } from './util';

const prefixCls = s.treePrefix;

function noop() {
}

class Tree extends Component {
  static defaultProps = {
    multiple: false,
    checkable: false,
    defaultExpandAll: false,
    autoExpandParent: true,
    defaultExpandedKeys: [],
    defaultCheckedKeys: [],
    defaultSelectedKeys: [],
    checkStrictly: false,
    showLine: false,
    showIcon: false,
    onExpand: noop,
    onCheck: noop,
    onSelect: noop,
    onDragStart: noop,
    onDragEnter: noop,
    onDragOver: noop,
    onDragLeave: noop,
    onDrop: noop,
    onDragEnd: noop
  }
  static PropTypes = {
    multipe: PropTypes.bool,
    checkable: PropTypes.bool,
    checkStrictly: PropTypes.bool,
    autoExpandParent: PropTypes.bool,
    expandAll: PropTypes.bool,
    showLine: PropTypes.bool,
    showIcon: PropTypes.bool,
    expandedKeys: PropTypes.Array,
    checkedKeys: PropTypes.Array,
    selectedKeys: PropTypes.Array,
    defaultCheckedKeys: PropTypes.Array,
    defaultExpandedKeys: PropTypes.Array,
    defaultSelectedKeys: PropTypes.Array,
    onExpand: PropTypes.func,
    onCheck: PropTypes.func,
    onSelect: PropTypes.func,
    loadData: PropTypes.func,
    filterTreeNode: PropTypes.func
  }
  constructor(props) {
    super(props);
    this.state = {
      expandedKeys: this.getDefaultExpandedKeys(props),
      checkedKeys: this.getDefaultCheckedKeys(props),
      selectedKeys: this.getDefaultSelectedKeys(props),
      dragNodesKeys: '',
      dragOverNodeKey: ''

    }
    this.checkedKeysChange = true;
    // this.checkedKeys = [];
    // this.halfCheckedKeys = [];
  }
  componentWillReceiveProps(nextProps) {
    const expandedKeys = this.getDefaultExpandedKeys(nextProps, true);
    const checkedKeys = this.getDefaultCheckedKeys(nextProps, true);
    const selectedKeys = this.getDefaultSelectedKeys(nextProps, true);
    const newState = {};
    if (expandedKeys) {
      newState.expandedKeys = expandedKeys;
    }
    if (checkedKeys) {
      if (nextProps.checkedKeys === this.props.checkedKeys) {
        this.checkedKeysChange = false;
      } else {
        this.checkedKeysChange = true;
      }
      newState.checkedKeys = checkedKeys;
    }
    if (selectedKeys) {
      newState.selectedKeys = selectedKeys;
    }
    this.setState(newState);
  }
  getDefaultExpandedKeys(props, willReceiveProps) {
    let expandedKeys = willReceiveProps ? undefined : this.getFilterExpandedKeys(props, 'defaultExpandedKeys', props.defaultExpandedKeys.length ? false : props.defaultExpandAll);
    if ('expandedKeys' in props) {
      expandedKeys = (props.autoExpandParent ? this.getFilterExpandedKeys(props, 'expandedKeys', false) : props.expandedKeys) || [];
    }
    return expandedKeys;
  }
  getFilterExpandedKeys(props, expandKeyProp, expandAll) {
    const keys = props[expandKeyProp];
    if (!expandAll && !props.autoExpandParent) {
      return keys || [];
    }
    const expandedPostionArr = [];
    if (props.autoExpandParent) {
      loopAllChildren(props.children, (child, index, key, pos, len) => {
        if (keys.indexOf(key) !== -1) {
          expandedPostionArr.push(pos);
        }
      })
    }
    const filterExpandedKeys = [];
    loopAllChildren(props.children, (child, index, key, pos, len) => {
      if (expandAll) {
        filterExpandedKeys.push(key);
      } else if (props.autoExpandParent) {
        // 找到对应的父节点，展开
        const regExp = new RegExp('^' + pos);
        expandedPostionArr.forEach(p => {
          if (regExp.test(p) && filterExpandedKeys.indexOf(key) === -1) {
            filterExpandedKeys.push(key);
          }
        })
      }
    })
    return filterExpandedKeys;
  }
  getDefaultCheckedKeys(props, willReceiveProps) {
    let checkedKeys = willReceiveProps ? undefined : props.defaultCheckedKeys;
    if ('checkedKeys' in props) {
      checkedKeys = props.checkedKeys || [];
      /*
      if (props.checkStrictly) { // 父子节点选中状态不再关联
        if (props.checkedKeys.checked) {
          checkedKeys = props.checkedKeys.checked;
        } else if (!Array.isArray(checkedKeys)) {
          checkedKeys = [];
        }
      } */
    }
    return checkedKeys;
  }
  getDefaultSelectedKeys(props, willReceiveProps) {
    const getKeys = keys => {
      if (props.multiple) {
        return [...keys];
      }
      if (keys.length) {
        return [keys[0]];
      }
      return keys;
    }
    let selectedKeys = willReceiveProps ? undefined : getKeys(props.defaultSelectedKeys);
    if ('selectedKeys' in props) {
      selectedKeys = getKeys(props.selectedKeys);
    }
    return selectedKeys;
  }
  onExpand(treeNode) {
    let expanded = !treeNode.props.expanded;
    const key = treeNode.props.eventKey;
    const expandedKeys = [...this.state.expandedKeys];
    const index = expandedKeys.indexOf(key);
    if (expanded && index === -1) {
      expandedKeys.push(key);
    } else if (!expanded && index !== -1) {
      expandedKeys.splice(index, 1);
    }
    if (!('expandedKeys' in this.props)) {
      this.setState({expandedKeys});
    }
    this.props.onExpand(expandedKeys, {node: treeNode, expanded});
    if (expanded && this.props.loadData) {
      return this.props.loadData(treeNode).then(() => {
        if (!('expandedKeys' in this.props)) {
          this.setState({expandedKeys});
        }
      })
    }
  }
  onCheck = treeNode => {
    let checkedKeys = [...this.checkedKeys];
    let halfCheckedKeys = [...this.halfCheckedKeys];
    let checked = !treeNode.props.checked;
    let halfChecked = treeNode.props.halfChecked;
    const key = treeNode.props.eventKey;
    const pos = treeNode.props.pos;
    const index = checkedKeys.indexOf(key);
    const halfIndex = halfCheckedKeys.indexOf(key);
    const treeNodesStatesArr = Object.keys(this.treeNodesStates);
    const nodeIndex = treeNodesStatesArr.indexOf(pos);
    if (halfChecked) {
      checked = true;
      // this.treeNodesStates[pos].checked = true;
      // checkedKeys.push(key);
      this.treeNodesStates[pos].halfChecked = false;
      halfCheckedKeys.splice(halfIndex, 1);
    }
    const newSt = {
      event: 'check',
      node: treeNode,
      checked
    }
    if (this.props.checkStrictly) {
      if (checked) {
        this.treeNodesStates[pos].checked = true;
        checkedKeys.push(key);
      } else {
        this.treeNodesStates[pos].checked = false;
        checkedKeys.splice(index, 1);
      }
    } else {
      if (checked) {
        this.treeNodesStates[pos].checked = true;
        checkedKeys.push(key);
        if (treeNode.props.children) {
          getAllChildChecked(this.treeNodesStates, nodeIndex, pos, checkedKeys, halfCheckedKeys);
        }
        getAllParentChecked(this.treeNodesStates, pos, checkedKeys, halfCheckedKeys);
      } else {
        this.treeNodesStates[pos].checked = false;
        checkedKeys.splice(index, 1);
        if (treeNode.props.children) {
          getAllChildUnchecked(this.treeNodesStates, nodeIndex, pos, checkedKeys, halfCheckedKeys);
        }
        getAllParentUnchecked(this.treeNodesStates, pos, checkedKeys, halfCheckedKeys);
      }
    }
    this.checkedKeys = checkedKeys;
    this.halfCheckedKeys = halfCheckedKeys;
    if (!('checkedKeys' in this.props)) {
      this.setState({checkedKeys});
    }
    newSt.halfCheckedKeys = halfCheckedKeys;
    newSt.checkedNodes = [];
    loopAllChildren(this.props.children, (child, index, key, pos, len) => {
      if (checkedKeys.indexOf(key) !== -1) {
        newSt.checkedNodes.push(child);
      }
    })
    this.props.onCheck(checkedKeys, newSt);
  }
  onSelect(treeNode) {
    const props = this.props;
    const selectedKeys = [...this.state.selectedKeys];
    const eventKey = treeNode.props.eventKey;
    const index = selectedKeys.indexOf(eventKey);
    let selected; // 判断这次是选中还是不选中
    if (index !== -1) {
      selected = false;
      selectedKeys.splice(index, 1);
    } else {
      selected = true;
      if (!props.multiple) {
        selectedKeys.length = 0;
      }
      selectedKeys.push(eventKey);
    }
    const newSt = {
      event: 'select',
      node: treeNode,
      selectedKeys: selectedKeys,
      selected
    }
    newSt.selectedNodes = [];
    if (selectedKeys.length > 0) {
      loopAllChildren(this.props.children, (child, index, key, pos, len) => {
        if (selectedKeys.indexOf(key) !== -1) {
          newSt.selectedNodes.push(child);
        }
      })
    }
    if (!('selectedKeys' in props)) {
      this.setState({selectedKeys});
    }
    this.props.onSelect(selectedKeys, newSt);
  }
  onDragStart(e, treeNode) {
    this.dragNode = treeNode;
    this.dragNodesKeys = this.getDragNodes(treeNode);
    const st = {
      dragNodesKeys: this.dragNodesKeys
    }
  }
  onDragEnterGap(e, treeNode) {
    const ele = treeNode.refs.selectHandle;
    const offsetTop = getOffset(ele).top;
    const offsetHeight = ele.offsetHeight;
    const pageY = e.pageY;
    const gapHeight = 2;
    if (pageY > offsetTop + offsetHeight - gapHeight) { // bottom
      this.dropPosition = 1;
      return 1;
    }
    if (pageY < offsetTop + gapHeight) { // top
      this.dropPosition = -1;
      return -1;
    }
    this.dropPosition = 0;
    return 0;
  }
  onDragEnter(e, treeNode) {
    console.log(e.pageY);
    const enterGap = this.onDragEnterGap(e, treeNode);
    if (this.dragNode.props.eventKey === treeNode.props.eventKey && enterGap === 0) {
      this.setState({
        dragOverNodeKey: ''
      });
      return;
    }
    const st = {
      dragOverNodeKey: treeNode.props.eventKey
    };
    const expandedKeys = this.getExpandedKeys(treeNode, true);
    if (expandedKeys) {
      st.expandedKeys = expandedKeys;
    }
    this.setState(st);
    this.props.onDragEnter({
      event: e,
      node: treeNode,
      expandedKeys: (expandedKeys && [...expandedKeys]) || [...this.state.expandedKeys]
    })
  }
  onDragOver(e, treeNode) {
    this.props.onDragOver({event: e, node: treeNode});
  }
  onDragLeave(e, treeNode) {
    this.props.onDragLeave({event: e, node: treeNode});
  }
  onDrop(e, treeNode) {
    const key = treeNode.props.eventKey;
    this.setState({
      dragOverNodeKey: '',
      dropNodeKey: key
    })
    if (this.dragNodesKeys.indexOf(key) !== -1) {
      if (console.warn) {
        console.warn('can not drop to dragNode(include it\'s children node)')
      };
      return false;
    }
    const posArr = treeNode.props.pos.split('-');
    const res = {
      event: e,
      node: treeNode,
      dragNode: this.dragNode,
      dragNodesKeys: [...this.dragNodesKeys],
      dropPosition: this.dropPosition + Number(posArr[posArr.length - 1])
    }
    if (this.dropPosition !== 0) {
      res.dropToGap = true;
    }
    this.props.onDrop(res);
  }
  onDragEnd(e, treeNode) {
    this.setState({
      dragOverNodeKey: ''
    });
    this.props.onDragEnd({event: e, node: treeNode});
  }
  getDragNodes(treeNode) {
    const dragNodesKeys = [];
    const tPos = treeNode.props.pos;
    const regExp = new RegExp('^' + tPos);
    loopAllChildren(this.props.children, (child, index, key, pos, len) => {
      if (regExp.test(pos)) {
        dragNodesKeys.push(key);
      }
    })
    return dragNodesKeys;
  }
  getExpandedKeys(treeNode, expand) {
    const key = treeNode.props.eventKey;
    const expandedKeys = [...this.state.expandedKeys];
    const index = expandedKeys.indexOf(key);
    let exKeys;
    if (index > -1 && !expand) {
      exKeys = [...expandedKeys];
      exKeys.splice(expandedKeys, 1);
      return exKeys;
    }
    if (expand && index === -1) {
      return expandedKeys.concat([key]);
    }
  }
  filterTreeNode(treeNode) {
    const filterTreeNode = this.props.filterTreeNode;
    if (typeof filterTreeNode !== 'function' || treeNode.props.disabled) {
      return false;
    }
    return filterTreeNode.call(this, treeNode);
  }
  renderTreeNode(child, index, level = 0) {
    const pos = `${level}-${index}`;
    const key = child.key || pos;
    const state = this.state;
    const props = this.props;
    const { checkedKeys, expandedKeys, selectedKeys } = state;
    const cloneProps = {
      root: this,
      prefixCls,
      ref: `treeNode-${key}`,
      eventKey: key,
      pos,
      expanded: expandedKeys.indexOf(key) !== -1,
      selected: selectedKeys.indexOf(key) !== -1,
      showLine: props.showLine,
      showIcon: props.showIcon,
      loadData: props.loadData,
      draggable: props.draggable,
      filterTreeNode: this.filterTreeNode.bind(this),
      dragOver: state.dragOverNodeKey === key && this.dropPosition === 0,
      dragOverGapTop: state.dragOverNodeKey === key && this.dropPosition === -1,
      dragOverGapBottom: state.dragOverNodeKey === key && this.dropPosition === 1
    };
    if (props.checkable) {
      cloneProps.checkable = props.checkable;
      if (props.checkStrictly) {
        if (checkedKeys) {
          cloneProps.checked = checkedKeys.indexOf(key) !== -1 || false;
        }
        if (props.checkedKeys && props.checkedKeys.halfChecked) {
          cloneProps.halfChecked = props.checkedKeys.halfChecked.indexOf(key) !== -1 || false;
        } else {
          cloneProps.halfChecked = false;
        }
      } else {
        cloneProps.checked = this.checkedKeys.indexOf(key) !== -1 || false;
        cloneProps.halfChecked = this.halfCheckedKeys.indexOf(key) !== -1 || false;
      }
    }
    return React.cloneElement(child, cloneProps);
  }
  render() {
    const props = this.props;
    const domProps = {
      className: cn(prefixCls, props.className, {
        [`${prefixCls}-line`]: props.showLine
      }),
      role: 'tree-node'
    };
    if (props.showLine && !props.checkable) {
      this.treeNodesStates = {};
      loopAllChildren(props.children, (child, index, key, pos, len) => {
        this.treeNodesStates[key] = {
          node: child,
          key,
          pos,
          len
        }
      })
    }
    if (!arrEqual(this.state.checkedKeys, this.checkedKeys) || props.loadData) {
      if (props.checkable) {
        const initCheckedKeys = [...this.state.checkedKeys];
        let checkedKeys = [];
        let halfCheckedKeys = [];
        this.treeNodesStates = {};
        if (!Array.isArray(this.checkedKeys)) {
          this.checkedKeys = [];
        }
        loopAllChildren(props.children, (child, index, key, pos, len) => {
          this.treeNodesStates[pos] = {
            node: child,
            key,
            pos,
            len,
            checked: false,
            halfChecked: false
          }
          if (initCheckedKeys.indexOf(key) !== -1) {
            checkedKeys.push(key);
            this.treeNodesStates[pos].checked = true;
          }
        });
        this.checkedKeys = [...checkedKeys];
        if (props.checkStrictly) {
          // this.checkedKeys = [...checkedKeys];
          this.halfCheckedKeys = [];
        } else {
          const treeNodesStatesArr = Object.keys(this.treeNodesStates); // 从最里面到最外面
          treeNodesStatesArr.forEach((item, index) => {
            const node = this.treeNodesStates[item];
            const key = node.key;
            const len = node.len;
            const pos = node.pos;
            const checked = node.checked;
            const halfChecked = node.halfChecked;
            if (this.checkedKeys.indexOf(key) !== -1) { // 找到其所有子节点与父节点
              if (len > 0) { // 找到所有子节点
                getAllChildChecked(this.treeNodesStates, index, pos, checkedKeys, halfCheckedKeys);
              }
              // 找到所有父节点
              getAllParentChecked(this.treeNodesStates, pos, checkedKeys, halfCheckedKeys);
            }
          })
          this.checkedKeys = [...checkedKeys];
          this.halfCheckedKeys = [...halfCheckedKeys];
        }
      }
    }
    return (
      <ul {...domProps} ref='tree'>
        {
          React.Children.map(props.children, this.renderTreeNode, this)
        }
      </ul>
    )
  }
}

export default Tree;
