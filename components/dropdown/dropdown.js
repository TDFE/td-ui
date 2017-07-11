import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ReactDOM from 'react-dom';
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
    onVisibleChange: PropTypes.func,
    getPopupContainer: PropTypes.func
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
    this.rootDom = null;
  }

  componentDidMount() {
    if (!this.rootDom) {
      this.rootDom = this.getContainer();
      this.setContainerInner();
    }
  }

  componentWillUnmount() {
    this.removeContainer();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.trigger === 'click') {
      this.addBodyClickEvent();
    }
    if ('visible' in nextProps) {
      this.setState({
        visible: nextProps.visible
      }, () => {
        this.setContainerInner();
      });
    } else {
      this.setContainerInner();
    }
  }

  removeContainer = () => {
    if (this.rootDom) {
      const container = this.rootDom;
      ReactDOM.unmountComponentAtNode(container);
      container.parentNode.removeChild(container);
      this.rootDom = null;
    }
  }

  getContainer = () => {
    const { getPopupContainer, placement } = this.props;
    const popupContainer = document.createElement('div');
    const { clientWidth, clientHeight, offsetLeft, offsetTop } = this.refs.btnBox;
    const bottomType = ['bottomLeft', 'bottomRight', 'bottomCenter'];
    console.log(clientWidth, clientHeight, offsetLeft, offsetTop);
    popupContainer.style.position = 'absolute';
    popupContainer.style.width = `${clientWidth}px`;
    popupContainer.style.left = `${offsetLeft}px`;
    popupContainer.style.top = `${offsetTop + (bottomType.indexOf(placement) >= 0 ? clientHeight : 0)}px`;
    popupContainer.style.height = '0px';
    const mountNode = getPopupContainer ? getPopupContainer() : window.document.body;
    mountNode.appendChild(popupContainer);
    return popupContainer;
  }

  setContainerInner = () => {
    if (this.rootDom) {
      const component = this.getInnerDom();
      ReactDOM.unstable_renderSubtreeIntoContainer(this, component, this.rootDom, function callback() {
        this._component = this;
        // if (ready) {
        //   ready.call(this);
        // }
      })
    }
  }

  getInnerDom = () => {
    const { overlay, prefixCls, placement } = this.props;
    const { visible } = this.state;
    return <div
      className={`${prefixCls} ${prefixCls}-${placement}`}
      onMouseEnter={this.mouseEnter}
      onMouseLeave={this.mouseLeave}
    >
      <div
        className={classnames(`${prefixCls}-list`, {[`${prefixCls}-list-hidden`]: !visible})}
      >
        <div className={`${prefixCls}-inner`}>{ React.cloneElement(overlay, {
          mode: 'vertical'
        }) }</div>
      </div>
    </div>
  }

  onVisibleChange(visible) {
    if ('onVisibleChange' in this.props) {
      this.props.onVisibleChange(visible);
    } else {
      this.setState({
        visible
      }, () => this.setContainerInner());
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
    const { prefixCls, children, placement } = this.props;
    return <div
      className={`${prefixCls} ${prefixCls}-${placement}`}
      onMouseEnter={this.mouseEnter}
      onMouseLeave={this.mouseLeave}
      ref='btnBox'
    >
      <span onClick={this.click}>{ children }</span>
    </div>
  }
}
