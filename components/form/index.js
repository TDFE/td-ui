/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-05-24 15:04:30
 * @Last modified by:   yzf
 * @Last modified time: 2017-05-24 15:04:33
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'lodash/omit';
import warning from 'warning';

import FormItem from './formItem';
import FormControl from './formControl';
import createForm from './createForm';
import { FIELD_META_PROP } from './constant';

export default class Form extends React.Component {
  static defaultProps = {
    prefixCls: 'ant-form',
    layout: 'horizontal',
    hideRequiredMark: false,
    onSubmit(e) {
      e.preventDefault();
    }
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    layout: PropTypes.oneOf(['horizontal', 'inline', 'vertical']),
    children: PropTypes.any,
    onSubmit: PropTypes.func,
    hideRequiredMark: PropTypes.bool
  };

  static childContextTypes = {
    vertical: PropTypes.bool
  };

  static Item = FormItem;
  static Control = FormControl;

  static create = options => {
    const formWrapper = createForm(Object.assign({
      fieldNameProp: 'id'
    }, options, {
      fieldMetaProp: FIELD_META_PROP
    }));

    return Component => formWrapper(
      class extends React.Component {
        static propTypes = {
          form: PropTypes.object.isRequired
        };

        static childContextTypes = {
          form: PropTypes.object.isRequired
        };

        getChildContext() {
          return {
            form: this.props.form
          };
        }

        render() {
          return <Component {...this.props} />;
        }
      }
    );
  };
}
