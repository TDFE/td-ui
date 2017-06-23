import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import s from './style';

const TabBar = createReactClass({
  displayName: 'TabContent',
  propTypes: {
    animated: PropTypes.bool,
    animatedWithMargin: PropTypes.bool,
    prefixCls: PropTypes.string,
    children: PropTypes.any,
    activeKey: PropTypes.string,
    style: PropTypes.any,
    tabBarPosition: PropTypes.string,
  },
  getTabPanes() {
    const props = this.props;
    const activeKey = props.activeKey;
    const children = props.children;
    const newChildren = [];

    React.Children.forEach(children, (child) => {
      if (!child) {
        return;
      }
      const key = child.key;
      const active = activeKey === key;
      newChildren.push(React.cloneElement(child, {
        active,
        destroyInactiveTabPane: props.destroyInactiveTabPane,
        rootPrefixCls: props.prefixCls,
      }));
    });

    return newChildren;
  },
  render() {
    return (
      <div className={s.tabsBars}>
        {this.getTabPanes()}
      </div>
    );
  },
});

export default TabBar;
