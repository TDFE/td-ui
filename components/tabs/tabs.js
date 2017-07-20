
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TabPane from './tabpanel';
// import TabBar from './tabbar'
// import cn from 'classNames';
// import omit from 'lodash/omit';
import s from './style';
// import Icon from '../icon';
function getDefaultActiveKey(props) {
  let activeKey;
  React.Children.forEach(props.children, (child) => {
    if (child && !activeKey && !child.props.disabled) {
      activeKey = child.key;
    }
  });
  return activeKey;
}
export default class Tabs extends Component {
  static defaultProps = {
    prefixCls: s.tabsPrefix,
    loading: false,
    clicked: false
  };

  static propTypes = {
    type: PropTypes.string,
    size: PropTypes.oneOf(['large', 'default', 'small']),
    htmlType: PropTypes.oneOf(['submit', 'button', 'reset']),
    destroyInactiveTabPane: PropTypes.bool,
    renderTabBar: PropTypes.func.isRequired,
    renderTabContent: PropTypes.func.isRequired,
    onChange: PropTypes.func,
    children: PropTypes.any,
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    tabBarPosition: PropTypes.string,
    style: PropTypes.object,
    activeKey: PropTypes.string,
    defaultActiveKey: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      tabsData: [],
      activeKey: ''
    };
    if ('activeKey' in props) {
      this.state.activeKey = props.activeKey;
    } else if ('defaultActiveKey' in props) {
      this.state.activeKey = props.defaultActiveKey;
    } else {
      this.state.activeKey = getDefaultActiveKey(props);
    }
  }

  onTabClick = (key) => {
    this.setState({
      activeKey: key
    });
  };

  getTabPane = () => {
    const props = this.props;
    const activeKey = props.activeKey;
    const children = props.children;
    React.Children.forEach(children, (child) => {
      if (!child) {
        return;
      }
      this.state.tabsData.push({
        key: child.key,
        tab: child.props.tab,
        context: child.props.children
      });
      this.setState({
        tabsData: this.state.tabsData,
        activeKey: activeKey
      });
    });
  };

  componentDidMount() {
    this.getTabPane();
  };

  render() {
    return (
      <div className={s.tabsPrefix}>
        <div className={s.tabsBars}>
          {this.state.tabsData.map((value, index) => {
            return (
              <span key={index} className={value.key === this.state.activeKey ? s.active : ''} onClick={() => {
                this.onTabClick(value.key);
              }}>{value.tab}</span>
            );
          })}
        </div>
        <div className={s.tabsContent}>
          {this.state.tabsData.map((value, index) => {
            return (
              <div key={index} className={value.key === this.state.activeKey ? '' : s.tabContentHidden}>
                {value.context}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

Tabs.TabPane = TabPane;
