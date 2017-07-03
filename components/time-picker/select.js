/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-06-21 09:58:00
 * @Last modified by:   yzf
 * @Last modified time: 2017-06-21 09:58:14
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import classnames from 'classnames';

const scrollTo = (element, to, duration) => {
  const requestAnimationFrame = window.requestAnimationFrame ||
    function requestAnimationFrameTimeout() {
      return setTimeout(arguments[0], 10);
    };
  // jump to target if duration zero
  if (duration <= 0) {
    element.scrollTop = to;
    return;
  }
  const difference = to - element.scrollTop;
  const perTick = difference / duration * 10;

  requestAnimationFrame(() => {
    element.scrollTop = element.scrollTop + perTick;
    if (element.scrollTop === to) return;
    scrollTo(element, to, duration - 10);
  });
};

class Select extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    options: PropTypes.array,
    selectedIndex: PropTypes.number,
    type: PropTypes.string,
    onSelect: PropTypes.func,
    onMouseEnter: PropTypes.func,
    offset: PropTypes.number,
    width: PropTypes.number,
    render: PropTypes.func
  };

  state = {
    active: false
  };

  componentDidMount() {
  // jump to selected option
    this.scrollToSelected(0);
  }

  componentDidUpdate({ value: preValue, selectedIndex: preSelected }) {
    // smooth scroll to selected option
    const { value, selectedIndex } = this.props;
    if (preSelected !== selectedIndex || (value && !value.isSame(preValue))) {
      this.scrollToSelected(120);
    }
  }

  onSelect = (value) => {
    const { onSelect, type } = this.props;
    onSelect(type, value);
  }

  getOptions() {
    const { options, selectedIndex, prefixCls, render } = this.props;
    return options.map((item, index) => {
      const cls = classnames({
        [`${prefixCls}-select-option-selected`]: selectedIndex === index,
        [`${prefixCls}-select-option-disabled`]: item.disabled
      });
      let onclick = null;
      if (!item.disabled) {
        onclick = this.onSelect.bind(this, item.value);
      }
      return (<li
        className={cls}
        key={index}
        onClick={onclick}
        disabled={item.disabled}
      >
        {render ? render(item.value) : item.value}
      </li>);
    });
  }

  scrollToSelected = duration => {
    // move to selected item
    const select = ReactDom.findDOMNode(this);
    const list = ReactDom.findDOMNode(this.refs.list);
    if (!list) {
      return;
    }
    let index = this.props.selectedIndex;
    if (index < 0) {
      index = 0;
    }
    let offset = this.props.offset || 0;
    const topOption = list.children[index];
    const to = topOption.offsetTop - offset;
    scrollTo(select, to, duration);
  };

  handleMouseEnter = (e) => {
    this.setState({ active: true });
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(e);
    }
  }

  handleMouseLeave = () => {
    this.setState({ active: false });
  }

  render() {
    if (this.props.options.length === 0) {
      return null;
    }

    const { prefixCls, width, type } = this.props;
    const cls = classnames({
      [`${prefixCls}-select`]: 1,
      [`${prefixCls}-select-active`]: this.state.active
    }, `${prefixCls}-${type}`);

    return (
      <div
        style={ width ? { width } : null }
        className={cls}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <ul ref="list">{this.getOptions()}</ul>
      </div>
    );
  }
}

export default Select;
