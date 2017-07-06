import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import s from './style';

export default class DropDown extends React.Component {
  static defaultProps = {
    prefixCls: s.dropdownPrefix,
    trigger: 'hover',
    placement: 'bottomLeft'
  }

  static propTypes = {
    prefixCls: PropTypes.string,
    trigger: PropTypes.oneOf(['click', 'hover']),
    placement: PropTypes.oneOf(['bottomLeft', 'bottomCenter', 'bottomRight', 'topLeft', 'topCenter', 'topRight']),
    overlay: PropTypes.node,
    visible: PropTypes.bool,
    onVisibleChange: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible || false
    }
    this.bodyEvent = false;
    if (props.trigger === 'click') {
      this.addBodyClickEvent();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.trigger === 'click') {
      this.addBodyClickEvent();
    }
    if ('visible' in nextProps) {
      this.setState({
        visible: nextProps.visible
      });
    }
  }

  onVisibleChange(visible) {
    if ('onVisibleChange' in this.props) {
      this.props.onVisibleChange(visible);
    } else {
      this.setState({
        visible
      });
    }
  }

  mouseEnter = () => {
    if (this.props.trigger === 'hover') {
      this.onVisibleChange(true);
    }
  }

  mouseLeave = () => {
    if (this.props.trigger === 'hover') {
      this.onVisibleChange(false);
    }
  }

  addBodyClickEvent = () => {
    if (!this.bodyEvent) {
      document.addEventListener('click', () => {
        console.log('body click');
        if (this.state.visible) {
          this.onVisibleChange(false);
        }
      }, false);
      this.bodyEvent = true;
    }
  }

  removeBodyClickEvent = () => {
    if (this.bodyEvent) {
      document.removeEventListener('click');
    }
  }

  click = (e) => {
    e.nativeEvent.stopImmediatePropagation();
    this.onVisibleChange(!this.state.visible);
  }

  render() {
    const { overlay, prefixCls, children, placement } = this.props;
    const { visible } = this.state;
    return <div
      className={`${prefixCls} ${prefixCls}-${placement}`}
      onMouseEnter={this.mouseEnter}
      onMouseLeave={this.mouseLeave}
    >
      <span onClick={this.click}>{ children }</span>
      <div
        className={classnames(`${prefixCls}-list`, {[`${prefixCls}-list-hidden`]: !visible})}
      >
        <div className={`${prefixCls}-inner`}>{ React.cloneElement(overlay, {
          mode: 'vertical'
        }) }</div>
      </div>
    </div>
  }
}
