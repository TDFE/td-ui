/**
 * Created by kongliang on 29/06/2017.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import PopupInner from './PopupInner';

export default class Popup extends React.Component {

  constructor(props) {
    super(props);
    this.container = null;//the container that holds the popup and will be mounted to document
  }

  static defaultProps = {
    visible: true,
    left: 0,
    top: 0,
  }

  componentDidMount() {
    this.renderComponent(this)
  }

  componentDidUpdate() {
    this.renderComponent(this)
  }

  shouldComponentUpdate({visible}) {
    return !!(this.props.visible || visible);
  }

  componentWillUnmount() {
    this.removeContainer();
  }

  getComponent() {
    const {props, state} = this;
    const mouseProps = {};
    // if (this.isMouseEnterToShow()) {
    //   mouseProps.onMouseEnter = this.onPopupMouseEnter;
    // }
    // if (this.isMouseLeaveToHide()) {
    //   mouseProps.onMouseLeave = this.onPopupMouseLeave;
    // }
    return (
      <PopupInner
        prefixCls={props.prefixCls}
        className={props.popupClassName}
        action={props.action}
        content={props.content}
        title={props.title}
        {...mouseProps}
      >
      </PopupInner>
    );
  }


  getContainer() {
    const popupContainer = document.createElement('div');
    // Make sure default popup container will never cause scrollbar appearing
    // https://github.com/react-component/trigger/issues/41
    popupContainer.style.position = 'absolute';
    // popupContainer.style.width = '100%';
    const mountNode = document.body;
    mountNode.appendChild(popupContainer);
    return popupContainer;
  }

  componentReady() {

    const pos = this.props.getToolTipPos(this.container.offsetWidth, this.container.offsetHeight);
    this.container.style.top = pos.top + 'px';
    this.container.style.left = pos.left + 'px';
  }

  renderComponent = (instance, ready) => {
    if (instance.component || instance.props.visible) {
      if (!this.container) {
        this.container = this.getContainer();
      }
      let component = this.getComponent();
      ReactDOM.unstable_renderSubtreeIntoContainer(this,
        component, this.container,
        function callback() {
          instance.component = this;
          instance.componentReady();
        });
    }
  }

  removeContainer = () => {
    if (this.container) {
      const container = this.container;
      ReactDOM.unmountComponentAtNode(container);
      container.parentNode.removeChild(container);
      this.container = null;
    }
  }

  render() {
    return null;
  }
}