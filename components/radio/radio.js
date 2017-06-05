/**
 * Created by sunxianxiong on 17/5/31.
 */
/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import shallowEqual from 'shallowequal';
import TDCheckbox from '../checkbox/tdcheckbox';
import s from './style';

export default class Radio extends Component {
  static defaultProps = {
    prefixCls: s.radioPrefix,
    className: '',
    style: {},
    type: 'radio',
    defaultChecked: false
  };

  static propTypes = {
    type: PropTypes.string,
    defaultChecked: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    checked: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    className: PropTypes.string,
    style: PropTypes.object
  };

  static contextTypes = {
    radioGroup: PropTypes.object
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState) || !shallowEqual(this.context.radioGroup, nextContext.radioGroup);
  };

  render() {
    const {props, context} = this;
    const {
      className, style, children, prefixCls, ...others
    } = props;

    const {radioGroup} = context;

    const radioPropTypes = {...others};

    let verticalDirection = false;

    if (radioGroup) {
      radioPropTypes.onChange = radioGroup.onChange;
      radioPropTypes.disabled = radioPropTypes.disabled || radioGroup.disabled;
      radioPropTypes.checked = radioPropTypes.value === radioGroup.value;
      verticalDirection = radioGroup.direction === 'vertical';
    }

    const st = Object.assign({}, style);
    const classNames = cn(className, {
      [`${prefixCls}-wrapper`]: true,
      [`${prefixCls}-wrapper-checked`]: props.checked,
      [`${prefixCls}-wrapper-disabled`]: props.disabled,
      [`${prefixCls}-wrapper-vertical`]: verticalDirection
    });

    return (
      <label
        className={classNames}
        style={st}
      >
        <TDCheckbox
          {...radioPropTypes}
          prefixCls={prefixCls}
        />
        {children !== undefined ? <span>{children}</span> : null}
      </label>
    );
  }
}
