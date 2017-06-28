/**
 * Created by sunxianxiong on 17/6/8.
 */
/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import shallowEqual from 'shallowequal';
import TDCheckbox from '../checkbox/tdcheckbox';
import s from './style';

export default class Checkbox extends Component {
  static defaultProps = {
    prefixCls: s.checkboxPrefix,
    className: '',
    style: {},
    type: 'checkbox',
    defaultChecked: false,
    indeterminate: false
  };

  static propTypes = {
    type: PropTypes.string,
    defaultChecked: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    checked: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    className: PropTypes.string,
    onChange: PropTypes.func,
    style: PropTypes.object
  };

  static contextTypes = {
    checkboxGroup: PropTypes.object
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState) || !shallowEqual(this.context.checkboxGroup, nextContext.checkboxGroup);
  };

  render() {
    const {props, context} = this;
    const {
      className, style, children, prefixCls, indeterminate, ...others
    } = props;

    const {checkboxGroup} = context;

    const checkboxPropTypes = {...others};

    if (checkboxGroup) {
      checkboxPropTypes.onChange = checkboxGroup.onChange;
      checkboxPropTypes.disabled = checkboxPropTypes.disabled || checkboxGroup.disabled;
      checkboxPropTypes.checked = checkboxGroup.value.indexOf(checkboxPropTypes.value) !== -1;
    }

    const st = Object.assign({}, style);
    const classNames = cn(className, {
      [`${prefixCls}-wrapper`]: true,
      [`${prefixCls}-wrapper-checked`]: props.checked,
      [`${prefixCls}-wrapper-disabled`]: props.disabled
    });

    const indeterminateClass = cn({
      [`${prefixCls}-indeterminate`]: indeterminate
    });

    return (
      <label
        className={classNames}
        style={st}
      >
        <TDCheckbox
          {...checkboxPropTypes}
          prefixCls={prefixCls}
          className={indeterminateClass}
        />
        {children !== undefined ? <span>{children}</span> : null}
      </label>
    );
  }
}
