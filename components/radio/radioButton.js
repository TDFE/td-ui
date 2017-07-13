/**
 * Created by sunxianxiong on 17/6/8.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Radio from './radio';
import s from './style';

export default class RadioButton extends Component {
  static defaultProps = {
    prefixCls: `${s.radioPrefix}-button`
  };

  static contextTypes = {
    radioGroup: PropTypes.object
  };

  render() {
    const { props, context } = this;

    const { radioGroup } = context;

    const radioPropTypes = { ...props };

    if (radioGroup) {
      radioPropTypes.onChange = radioGroup.onChange;
      radioPropTypes.disabled = radioPropTypes.disabled || radioGroup.disabled;
      radioPropTypes.checked = radioPropTypes.value === radioGroup.value;
    }

    return (
      <Radio
        {...radioPropTypes}
      />
    );
  }
}
