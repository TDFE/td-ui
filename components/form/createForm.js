/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-06-16 10:06:28
 * @Last modified by:   yzf
 * @Last modified time: 2017-06-16 10:07:03
 *
 * 此部分参考rc-form
 */

import React from 'react';
import warning fromm 'warning';
import FieldsStore from './fieldsStore';
import {
  argumentContainer,
  getValueFromEvent,
  hasRules,
  getParams,
  isEmptyObject,
  flattenArray,
  getNameIfNested,
  flatFieldNames,
  clearVirtualField,
  getVirtualPaths,
  normalizeValidateRules
} from './utils';

const DEFAULT_TRIGGER = 'onChange';

export default ({
    mapPropsToFields,
    onFieldsChange,
    onValuesChange,
    fieldNameProp,
    fieldMetaProp,
    validateMessages,
    mapProps = (obj => obj),
    formPropName = 'form'
  }) => WrappedComponent => argumentContainer(
    class extends React.Component {
      constructor(props) {
        const fields = mapPropsToFields && mapPropsToFields(props);
        this.fieldsStore = new FieldsStore(fields || {});
        this.instances = {};
        this.cachedBind = {};
        this.state = {
          submitting: false
        };
      }

      componentWillReceiveProps(nextProps) {
        if (mapPropsToFields) {
          this.fieldsStore.replaceFields(mapPropsToFields(nextProps));
        }
      }

      onCollectCommon = (name_, action, args) => {
        let name = name_;
        const fieldMeta = this.fieldsStore.getFieldMeta(name);
        if (fieldMeta[action]) {
          fieldMeta[action](...args);
        } else if (fieldMeta.originalProps && fieldMeta.originalProps[action]) {
          fieldMeta.originalProps[action](...args);
        }
        const value = fieldMeta.getValueFromEvent ?
          fieldMeta.getValueFromEvent(...args) :
          getValueFromEvent(...args);
        if (onValuesChange) {
          onValuesChange(this.props, set({}, name, value));
        }
        const nameKeyObj = getNameIfNested(name);
        if (this.fieldsStore.getFieldMeta(nameKeyObj.name).exclusive) {
          name = nameKeyObj.name;
        }
        const field = this.fieldsStore.getField(name);
        return ({ name, field: { ...field, value, touched: true }, fieldMeta });
      };

      onCollect = (name_, action, ...args) => {
        const { name, field, fieldMeta } = this.onCollectCommon(name_, action, args);
        const { validate } = fieldMeta;
        const fieldContent = {
          ...field,
          dirty: hasRules(validate),
        };
        this.setFields({
          [name]: fieldContent,
        });
      };

      onCollectValidate = (name_, action, ...args) => {
        const { field, fieldMeta } = this.onCollectCommon(name_, action, args);
        const fieldContent = {
          ...field,
          dirty: true,
        };
        this.validateFieldsInternal([fieldContent], {
          action,
          options: {
            firstFields: !!fieldMeta.validateFirst,
          },
        });
      };

      getCacheBind = (name, action, fn) => {
        const cache = this.cachedBind[name] = this.cachedBind[name] || {};
        if (!cache[action]) {
          cache[action] = fn.bind(this, name, action);
        }
        return cache[action];
      };

      getFieldDecorator = (name, fieldOption) => {
        const props = this.getFieldProps(name, fieldOption);
        return (fieldElem) => {
          const fieldMeta = this.fieldsStore.getFieldMeta(name);
          const originalProps = fieldElem.props;
          if (process.env.NODE_ENV !== 'production') {
            const valuePropName = fieldMeta.valuePropName;
            warning(
              !(valuePropName in originalProps),
              `\`getFieldDecorator\` will override \`${valuePropName}\`, ` +
              `so please don't set \`${valuePropName}\` directly ` +
              `and use \`setFieldsValue\` to set it.`
            );
            const defaultValuePropName =
              `default${valuePropName[0].toUpperCase()}${valuePropName.slice(1)}`;
            warning(
              !(defaultValuePropName in originalProps),
              `\`${defaultValuePropName}\` is invalid ` +
              `for \`getFieldDecorator\` will set \`${valuePropName}\`,` +
              ` please use \`option.initialValue\` instead.`
            );
          }
          fieldMeta.originalProps = originalProps;
          fieldMeta.ref = fieldElem.ref;
          return React.cloneElement(fieldElem, {
            ...props,
            ...this.fieldsStore.getFieldValuePropValue(fieldMeta),
          });
        };
      };

      getFieldProps = (name, usersFieldOption = {}) => {
        if (!name) {
          throw new Error('Must call `getFieldProps` with valid name string!');
        }

        const nameIfNested = getNameIfNested(name);
        const leadingName = nameIfNested.name;
        const fieldOption = {
          valuePropName: 'value',
          validate: [],
          trigger: DEFAULT_TRIGGER,
          leadingName,
          name,
          ...usersFieldOption,
        };

        const {
          rules,
          trigger,
          validateTrigger = trigger,
          exclusive,
          validate,
        } = fieldOption;

        const fieldMeta = this.fieldsStore.getFieldMeta(name);
        if ('initialValue' in fieldOption) {
          fieldMeta.initialValue = fieldOption.initialValue;
        }

        const leadingFieldMeta = this.fieldsStore.getFieldMeta(leadingName);
        if (nameIfNested.isNested) {
          leadingFieldMeta.virtual = !exclusive;
          // exclusive allow getFieldProps('x', {initialValue})
          // non-exclusive does not allow getFieldProps('x', {initialValue})
          leadingFieldMeta.hidden = !exclusive;
          leadingFieldMeta.exclusive = exclusive;
        }

        const inputProps = {
          ...this.fieldsStore.getFieldValuePropValue(fieldOption),
          ref: this.getCacheBind(name, `${name}__ref`, this.saveRef),
        };
        if (fieldNameProp) {
          inputProps[fieldNameProp] = name;
        }

        const validateRules = normalizeValidateRules(validate, rules, validateTrigger);
        const validateTriggers = validateRules
          .filter(item => !!item.rules && item.rules.length)
          .map(item => item.trigger)
          .reduce((pre, curr) => pre.concat(curr), []);
        validateTriggers.forEach((action) => {
          if (inputProps[action]) return;
          inputProps[action] = this.getCacheBind(name, action, this.onCollectValidate);
        });

        // make sure that the value will be collect
        if (trigger && validateTriggers.indexOf(trigger) === -1) {
          inputProps[trigger] = this.getCacheBind(name, trigger, this.onCollect);
        }

        const meta = {
          ...fieldMeta,
          ...fieldOption,
          validate: validateRules,
        };
        this.fieldsStore.setFieldMeta(name, meta);
        if (fieldMetaProp) {
          inputProps[fieldMetaProp] = meta;
        }

        return inputProps;
      };

      setFields = fields => {
        this.fieldsStore.setFields(fields);
        if (onFieldsChange) {
          const changedFields = {};
          Object.keys(fields).forEach((f) => {
            changedFields[f] = this.fieldsStore.getField(f);
          });
          onFieldsChange(this.props, changedFields);
        }
        this.forceUpdate();
      };

      resetFields = ns => {
        const newFields = this.fieldsStore.resetFields(ns);
        if (Object.keys(newFields).length > 0) {
          this.setFields(newFields);
        }
      };

      setFieldsValue = fieldsValue => {
        if (onValuesChange) {
          onValuesChange(this.props, fieldsValue);
        }
        const newFields = {};
        const { fieldsMeta, fields } = this.fieldsStore;
        const virtualPaths = getVirtualPaths(fieldsMeta);
        Object.keys(fieldsValue).forEach((name) => {
          const value = fieldsValue[name];
          if (fieldsMeta[name] && fieldsMeta[name].virtual) {
            clearVirtualField(name, fields, fieldsMeta);
            for (let i = 0, len = virtualPaths[name].length; i < len; i++) {
              const path = virtualPaths[name][i];
              if (has(fieldsValue, path)) {
                newFields[path] = {
                  name: path,
                  value: get(fieldsValue, path),
                };
              }
            }
          } else if (fieldsMeta[name]) {
            newFields[name] = {
              name,
              value,
            };
          } else {
            warning(
              false,
              'Cannot use `setFieldsValue` until ' +
                'you use `getFieldDecorator` or `FormControl` to register it.'
            );
          }
        });
        this.setFields(newFields);
      };

      getFieldInstance = name => this.instances[name];

      getRules = (fieldMeta, action) => {
        const actionRules = fieldMeta.validate.filter((item) => {
          return !action || item.trigger.indexOf(action) >= 0;
        }).map((item) => item.rules);
        return flattenArray(actionRules);
      };

      isSubmitting = () => {
        return this.state.submitting;
      };

      submit = callback => {
        const fn = () => {
          this.setState({
            submitting: false,
          });
        };
        this.setState({
          submitting: true,
        });
        callback(fn);
      };

      render() {
        const { wrappedComponentRef, ...restProps } = this.props;
        const formProps = {
          [formPropName]: {
            getFieldsValue: this.fieldsStore.getFieldsValue,
            getFieldValue: this.fieldsStore.getFieldValue,
            getFieldInstance: this.getFieldInstance,
            setFieldsValue: this.setFieldsValue,
            setFields: this.setFields,
            setFieldsInitialValue: this.fieldsStore.setFieldsInitialValue,
            getFieldDecorator: this.getFieldDecorator,
            getFieldsError: this.fieldsStore.getFieldsError,
            getFieldError: this.fieldsStore.getFieldError,
            isFieldValidating: this.fieldsStore.isFieldValidating,
            isFieldsValidating: this.fieldsStore.isFieldsValidating,
            isFieldsTouched: this.fieldsStore.isFieldsTouched,
            isFieldTouched: this.fieldsStore.isFieldTouched,
            isSubmitting: this.isSubmitting,
            submit: this.submit,
            validateFields: this.validateFields,
            resetFields: this.resetFields
          }
        };
        if (wrappedComponentRef) {
          formProps.ref = wrappedComponentRef;
        }

        const props = mapProps.call(this, {
          ...formProps,
          ...restProps
        });
        return <WrappedComponent {...props}/>;
      }
    },
    WrappedComponent
  );
