import React from 'react';
import ReactDOM from 'react-dom';
/* eslint-disable no-unused-vars */
import Dialog from './dialog';

export default class DialogWrap extends React.Component {
  static defaultProps = {
    visible: false
  }

  componentDidMount() {
    this.renderComponent(this)
  }

  componentDidUpdate() {
    this.renderComponent(this)
  }

  shouldComponentUpdate({ visible }) {
    return !!(this.props.visible || visible);
  }

  componentWillUnmount() {
    if (this.props.visible) {
      this.renderComponent(this, {
        afterClose: this.removeContainer,
        onClose() {
        },
        visible: false
      });
    } else {
      this.removeContainer();
    }
  }

  renderComponent = (instance, componentArg, ready) => {
    if (instance._component || instance.props.visible) {
      if (!instance._container) {
        instance._container = this.getContainer();
      }
      let component = instance.getComponent(componentArg);
      ReactDOM.unstable_renderSubtreeIntoContainer(instance, component, instance._container, function callback() {
        instance._component = this;
        if (ready) {
          ready.call(this);
        }
      })
    }
  }

  removeContainer = () => {
    if (this._container) {
      const container = this._container;
      ReactDOM.unmountComponentAtNode(container);
      container.parentNode.removeChild(container);
      this._container = null;
    }
  }

  getComponent = () => {
    return (
      <Dialog
        {...this.props}
        key="dialog"
      />
    )
  }

  getContainer = () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    return container;
  }

  render () {
    return null
  }
}
