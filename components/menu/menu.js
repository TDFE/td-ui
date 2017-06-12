import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import s from './style';

export default class Menu extends React.Component {
  static defaultProps = {
    prefixCls: s.menuPrefix,
    children: '',
    mode: 'inline'
  }

  static propTypes = {
    mode: PropTypes.oneOf(['inline', 'vertical', 'horizontal']),
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    defaultSelectedKeys: PropTypes.arrayOf(PropTypes.string),
    selectedKeys: PropTypes.arrayOf(PropTypes.string),
    onSelect: PropTypes.func,
    defaultOpenKeys: PropTypes.arrayOf(PropTypes.string),
    openKeys: PropTypes.arrayOf(PropTypes.string),
    onOpenChange: PropTypes.func
  }

  constructor(props) {
    super(props);
    let selectedKeys = props.defaultSelectedKeys || [];
    let openKeys = props.defaultOpenKeys || [];
    if ('selectedKeys' in props) {
      selectedKeys = props.selectedKeys || [];
    }
    if ('openKeys' in props) {
      openKeys = props.openKeys || [];
    }
    this.state = {
      openKeys,
      selectedKeys
    }
  }

  componentWillReceiveProps(nextProps) {
    const props = {};
    if ('selectedKeys' in nextProps) {
      props.selectedKeys = nextProps.selectedKeys || [];
    }
    if ('openKeys' in nextProps) {
      props.openKeys = nextProps.openKeys || [];
    }
    this.setState(props);
  }

  renderItem = (child, index) => {
    const { prefixCls, level, mode } = this.props;
    const { openKeys, selectedKeys } = this.state;
    let newChildProps = {
      prefixCls,
      openKeys,
      selectedKeys,
      onSelect: this.onSelect,
      onOpenChange: this.onOpenChange,
      level: level ? (level + 1) : 1,
      eventKey: child.key || `menu-${index}`,
      mode
    }
    return React.cloneElement(child, newChildProps);
  }

  onSelect = (selectedKeys) => {
    const { mode } = this.props;
    if ('onSelect' in this.props) {
      this.props.onSelect(selectedKeys);
    } else {
      this.setState({
        selectedKeys
      })
    }
    if (mode !== 'inline') {
      this.onOpenChange([]);
    }
  }

  onOpenChange = (openKeys) => {
    if ('onOpenChange' in this.props) {
      this.props.onOpenChange(openKeys);
    } else {
      this.setState({
        openKeys
      })
    }
  }

  render() {
    const { prefixCls, children, style, mode } = this.props;
    return <ul className={classnames(prefixCls, `${prefixCls}-${mode}`)} style={style}>{ React.Children.map(children, this.renderItem) }</ul>;
  }
}
