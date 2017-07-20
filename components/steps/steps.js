import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './style';

export default class Steps extends Component {
  static defaultProps = {
    prefixCls: s.stepsPrefix,
    children: '',
    mode: 'horizontal'
  }

  static propTypes = {
    mode: PropTypes.oneOf(['mini', 'vertical', 'horizontal']),
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
  }
  render() {
    const { prefixCls, children, current, mode } = this.props;
    return (<div className={`${prefixCls} ${prefixCls}-${mode}`}>
      {
          React.Children.map(children, (child, index) => {
            const props = {
              stepNumber: index,
              current,
              mode,
              stepLength: children.length
            };
            return React.cloneElement(child, props);
          })
        }
    </div>)
  }
}
