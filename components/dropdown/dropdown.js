import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import Trigger from 'rc-trigger';
import placements from './placements';
import ReactDOM from 'react-dom';
import s from './style';

export default class DropDown extends React.Component {
  static defaultProps = {
    prefixCls: s.dropdownPrefix,
    mouseEnterDelay: 0.15,
    mouseLeaveDelay: 0.1,
    placement: 'bottomLeft',
    defaultVisible: false,
    onVisibleChange() {
    },
    trigger: 'hover',
    showAction: [],
    hideAction: [],
    overlayClassName: '',
    overlayStyle: {},
    minOverlayWidthMatchTrigger: true
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
    if ('visible' in props) {
      this.state = {
        visible: props.visible
      };
    } else {
      this.state = {
        visible: props.defaultVisible
      };
    }
  }

  componentWillReceiveProps({ visible }) {
    if (visible !== undefined) {
      this.setState({
        visible
      });
    }
  }

  onClick = (e) => {
    const props = this.props;
    const overlayProps = props.overlay.props;
    // do no call onVisibleChange, if you need click to hide, use onClick and control visible
    if (!('visible' in props)) {
      this.setState({
        visible: false
      });
    }
    if (overlayProps.onClick) {
      overlayProps.onClick(e);
    }
  }

  onVisibleChange = (visible) => {
    const props = this.props;
    if (!('visible' in props)) {
      this.setState({
        visible
      });
    }
    props.onVisibleChange(visible);
  }

  getMenuElement() {
    const { overlay } = this.props;
    const extraOverlayProps = {
      prefixCls: `td-menu`,
      onClick: this.onClick,
      mode: 'vertical'
    };
    if (typeof overlay.type === 'string') {
      delete extraOverlayProps.prefixCls;
    }
    return cloneElement(overlay, extraOverlayProps);
  }

  getPopupDomNode() {
    return this.refs.trigger.getPopupDomNode();
  }

  afterVisibleChange = (visible) => {
    if (visible && this.props.minOverlayWidthMatchTrigger) {
      const overlayNode = this.getPopupDomNode();
      const rootNode = ReactDOM.findDOMNode(this);
      if (rootNode.offsetWidth > overlayNode.offsetWidth) {
        overlayNode.style.width = `${rootNode.offsetWidth}px`;
      }
    }
  }

  getTransitionName() {
    const { placement = '' } = this.props;
    if (placement.indexOf('top') >= 0) {
      return 'slide-down';
    }
    return 'slide-up';
  }

  render() {
    const {
      prefixCls, children, animation,
      align, placement, getPopupContainer,
      showAction, hideAction,
      overlayClassName, overlayStyle,
      trigger, overlay, ...otherProps
    } = this.props;
    return <Trigger
      {...otherProps}
      prefixCls={`${prefixCls}-menu`}
      ref="trigger"
      popupClassName={overlayClassName}
      popupStyle={overlayStyle}
      builtinPlacements={placements}
      action={[trigger]}
      showAction={showAction}
      hideAction={hideAction}
      popupPlacement={placement}
      popupAlign={align}
      popupTransitionName={this.getTransitionName()}
      popupAnimation={animation}
      popupVisible={this.state.visible}
      afterPopupVisibleChange={this.afterVisibleChange}
      popup={this.getMenuElement()}
      onPopupVisibleChange={this.onVisibleChange}
      getPopupContainer={getPopupContainer}
    >
      {children}
    </Trigger>
  }
}
