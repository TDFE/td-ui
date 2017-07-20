/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import assign from 'object-assign';
import Icon from '../icon';
import { browser } from './util';
const browserUa = typeof window !== 'undefined' ? browser(window.navigator) : '';
const ieOrEdge = /.*(IE|Edge).+/.test(browserUa);

class TreeNode extends Component {
  static defaultProps = {
    disabled: false,
    disableCheckbox: false,
    title: '---',
    isLeaf: false
  }
  static PropTypes = {
    disabled: PropTypes.bool,
    disableCheckbox: PropTypes.bool,
    title: PropTypes.oneOf([PropTypes.string, PropTypes.element]),
    key: PropTypes.string,
    isLeaf: PropTypes.bool
  }
  constructor(props) {
    super(props);
    this.state = {
      dataLoading: false,
      dragNodeHighlight: false
    }
  }
  onCheck = () => {
    this.props.root.onCheck(this);
  }
  onExpand = () => {
    const props = this.props;
    const callbackPromise = this.props.root.onExpand(this);
    if (callbackPromise && typeof callbackPromise === 'object' && !props.children) {
      const setLoading = (dataLoading) => {
        this.setState({ dataLoading });
      };
      setLoading(true);
      callbackPromise.then(() => {
        setLoading(false);
      }, () => {
        setLoading(false);
      });
    }
  }
  onSelect = () => {
    this.props.root.onSelect(this);
  }
  onDragStart = e => {
    e.stopPropagation();
    this.setState({
      dragNodeHighlight: true
    });
    this.props.root.onDragStart(e, this);
    try {
      e.dataTransfer.setData('text/plain', '');
    } catch (error) {
    }
  }
  onDragEnter = e => {
    e.preventDefault();
    e.stopPropagation();
    this.props.root.onDragEnter(e, this);
  }
  onDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
    this.props.root.onDragOver(e, this);
    return false;
  }
  onDragLeave = e => {
    e.stopPropagation();
    this.props.root.onDragLeave(e, this);
  }
  onDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      dragNodeHighlight: false
    })
    this.props.root.onDrop(e, this);
  }
  onDragEnd = e => {
    e.stopPropagation();
    this.setState({
      dragNodeHighlight: false
    })
    this.props.root.onDragEnd(e, this);
  }
  renderSwitcher(props, expandedState) {
    const prefixCls = props.prefixCls;
    const dataLoading = this.state.dataLoading;
    const switcherCls = {
      [`${prefixCls}-switcher`]: true
    };
    if (!props.showLine) {
      if (props.children || (props.loadData && !props.isLeaf)) {
        switcherCls[`${prefixCls}-switcher-noline-${expandedState}`] = true;
      }
    } else if (props.children || (props.loadData && !props.isLeaf)) {
      switcherCls[`${prefixCls}-switcher-line-root-${expandedState}`] = true;
    } else if (!props.children) {
      switcherCls[`${prefixCls}-switcher-line-child`] = true;
    }
    if (props.disabled) {
      switcherCls[`${prefixCls}-switcher-disabled`] = true;
      return <span className={cn(switcherCls)}></span>;
    }
    return <span className={cn(switcherCls)} onClick={this.onExpand}></span>;
  }
  renderNoopSwitcher(props) {
    const prefixCls = props.prefixCls;
    const switcherCls = {
      [`${prefixCls}-switcher`]: true
    }
    if (!props.root.props.children) {
      switcherCls[`${prefixCls}-switcher-line-child`] = true;
    }
    return <span className={cn(switcherCls)}></span>;
  }
  renderCheckbox(props) {
    const prefixCls = props.prefixCls;
    const checkboxCls = {
      [`${prefixCls}-checkbox`]: true
    };
    if (props.checked) {
      checkboxCls[`${prefixCls}-checkbox-checked`] = true;
    } else if (props.halfChecked) {
      checkboxCls[`${prefixCls}-checkbox-indeterminate`] = true;
    }
    if (props.disabled || props.disableCheckbox) {
      checkboxCls[`${prefixCls}-checkbox-disabled`] = true;
      return <span ref='checkbox' className={cn(checkboxCls)}></span>
    }
    return <span ref='checkbox' className={cn(checkboxCls)} onClick={this.onCheck}></span>
  }
  renderChildren(props) {
    const { prefixCls, children, expanded } = props;
    let newChildren = children;
    let level = 0;
    if (children) {
      if ((Array.isArray(children) && children.every(child => child.type && child.type.isTreeNode)) || (children.type && children.type.isTreeNode)) {
        const cls = {
          [`${prefixCls}-child`]: true,
          [`${prefixCls}-child-open`]: expanded
        };
        newChildren = expanded ? <ul data-expanded={expanded} className={cn(cls)}>
          {
            React.Children.map(children, (child, index) => {
              return props.root.renderTreeNode(child, index, props.pos);
            }, props.root)
          }
        </ul> : null;
      }
    }
    return newChildren;
  }
  render() {
    const props = this.props;
    const { prefixCls, expanded, title, disabled, selected } = props;
    const { dataLoading, dragNodeHighlight } = this.state;
    const expandedState = expanded ? 'open' : 'close';
    let canRenderSwitcher = true;
    let newChildren = this.renderChildren(props);
    const iconEleCls = {
      [`${prefixCls}-iconEle`]: true,
      [`${prefixCls}-icon-loading`]: dataLoading
    }
    if (!newChildren) {
      canRenderSwitcher = false;
    }
    const domProps = {
      className: `${prefixCls}-content ${prefixCls}-content-${expandedState}`
    };

    if (!props.disabled) {
      if (props.selected || dragNodeHighlight) {
        domProps.className += ' selected';
      }
      domProps.onClick = e => {
        e.preventDefault();
        this.onSelect();
      }
      if (props.draggable) {
        domProps.className += ' draggable';
        if (ieOrEdge) {
          domProps.href = '#';
        }
        domProps.draggable = true;
        domProps['aria-grabbed'] = true;
        domProps.onDragStart = this.onDragStart;
      }
    }
    const selectHandle = () => {
      const icon = (props.showIcon || (props.loadData && dataLoading)) ? <span className={cn(iconEleCls)}>{
        dataLoading ? <span className='loading'><Icon type='loading' /></span> : null
      }</span> : '';
      const content = <span className={`${prefixCls}-title`}>{title}</span>;
      return (
        <span {...domProps} ref='selectHandle' title={typeof title === 'string' ? title : ''}>
          {icon}
          {content}
        </span>
      )
    }
    const liProps = {};
    if (props.draggable) {
      liProps.onDragEnter = this.onDragEnter;
      liProps.onDragOver = this.onDragOver;
      liProps.onDragLeave = this.onDragLeave;
      liProps.onDrop = this.onDrop;
      liProps.onDragEnd = this.onDragEnd;
    }
    let disabledCls = '';
    let dragOverCls = '';
    if (props.disabled) {
      disabledCls = `${prefixCls}-treenode-disabled`;
    } else if (props.dragOver) {
      dragOverCls = 'drag-over';
    } else if (props.dragOverGapTop) {
      dragOverCls = 'drag-over-gap-top';
    } else if (props.dragOverGapBottom) {
      dragOverCls = 'drag-over-gap-bottom';
    }
    const filterCls = props.filterTreeNode(this) ? 'filter-node' : '';
    return (
      <li {...liProps} ref='li' className={cn(props.className, disabledCls, dragOverCls, filterCls)}>
        {
          this.renderSwitcher(props, expandedState)
        }
        {
          props.checkable ? this.renderCheckbox(props) : ''
        }
        {selectHandle()}
        {newChildren}
      </li>
    )
  }
}

TreeNode.isTreeNode = 1;

export default TreeNode;
