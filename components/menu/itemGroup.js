import React from 'react';
import PropTypes from 'prop-types';
import s from './style';
import MixinComponent from './mixinComponent';

export default class ItemGroup extends MixinComponent {
  static defaultProps = {
    prefixCls: s.menuPrefix,
    title: '',
    children: ''
  }

  static propTypes = {
    prefixCls: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
  }

  constructor (props) {
    super(props);
    this.num = 0;
  }

  render() {
    const { prefixCls, title, children, level, mode } = this.props;
    let style = {};
    if (mode === 'inline') {
      style = {
        paddingLeft: level * 24 - 12
      }
    }
    return <li className={`${prefixCls}-item-group`}>
      <div className={`${prefixCls}-item-group-title`} style={style}>{ title }</div>
      <ul className={`${prefixCls}-item-group-list`}>
        { React.Children.map(children, this.renderItem) }
      </ul>
    </li>;
  }
}
