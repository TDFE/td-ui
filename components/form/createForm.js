/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-06-16 10:06:28
 * @Last modified by:   yzf
 * @Last modified time: 2017-06-16 10:07:03
 *
 * 此部分参考rc-form
 */

import React from 'react';
import ReactDOM from 'react-dom';
import scrollIntoView from 'dom-scroll-into-view';
import AsyncValidator from 'async-validator';
import get from 'lodash/get';
import has from 'lodash/has';
import set from 'lodash/set';
import warning from 'warning';
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

function computedStyle(el, prop) {
  const getComputedStyle = window.getComputedStyle;
  const style = getComputedStyle ? getComputedStyle(el) : el.currentStyle;
  if (style) {
    return style[prop.replace(/-(\w)/gi, (word, letter) => letter.toUpperCase())];
  }
  return undefined;
}

function getScrollableContainer(n) {
  let node = n;
  let nodeName;
  while ((nodeName = node.nodeName.toLowerCase()) !== 'body') {
    const overflowY = computedStyle(node, 'overflowY');
    if (node !== n && (overflowY === 'auto' || overflowY === 'scroll')) {
      return node;
    }
    node = node.parentNode;
  }
  return nodeName === 'body' ? node.ownerDocument : node;
}

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
        super(props);
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

      validateFieldsAndScroll = (ns, opt, cb) => {
        const { names, callback, options } = getParams(ns, opt, cb);

        const newCb = (error, values) => {
          if (error) {
            const validNames = this.fieldsStore.getValidFieldsName();
            let firstNode;
            let firstTop;
            for (const name of validNames) {
              if (has(error, name)) {
                const instance = this.getFieldInstance(name);
                if (instance) {
                  const node = ReactDOM.findDOMNode(instance);
                  const top = node.getBoundingClientRect().top;
                  if (firstTop === undefined || firstTop > top) {
                    firstTop = top;
                    firstNode = node;
                  }
                }
              }
            }
            if (firstNode) {
              const c = options.container || getScrollableContainer(firstNode);
              scrollIntoView(firstNode, c, {
                onlyScrollIfNeeded: true,
                ...options.scroll
              });
            }
          }

          if (typeof callback === 'function') {
            callback(error, values);
          }
        };

        return this.validateFields(names, options, newCb);
      };

      onCollectCommon = (name_, action, args) => {
        let name = name_;
        const fieldMeta = this.fieldsStore.getFieldMeta(name);
        if (fieldMeta[action]) {
          fieldMeta[action](...args);
        } else if (fieldMeta.originalProps && fieldMeta.originalProps[action]) {
          fieldMeta.originalProps[action](...args);
        }
        const value = fieldMeta.getValueFromEvent ? fieldMeta.getValueFromEvent(...args) : getValueFromEvent(...args);
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
          dirty: hasRules(validate)
        };
        this.setFields({
          [name]: fieldContent
        });
      };

      onCollectValidate = (name_, action, ...args) => {
        const { field, fieldMeta } = this.onCollectCommon(name_, action, args);
        const fieldContent = {
          ...field,
          dirty: true
        };
        this.validateFieldsInternal([fieldContent], {
          action,
          options: {
            firstFields: !!fieldMeta.validateFirst
          }
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
            ...this.fieldsStore.getFieldValuePropValue(fieldMeta)
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
          ...usersFieldOption
        };

        const {
          rules,
          trigger,
          validateTrigger = trigger,
          exclusive,
          validate
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
          ref: this.getCacheBind(name, `${name}__ref`, this.saveRef)
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
          validate: validateRules
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
                  value: get(fieldsValue, path)
                };
              }
            }
          } else if (fieldsMeta[name]) {
            newFields[name] = {
              name,
              value
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

      saveRef(name, _, component) {
        if (!component) {
          // after destroy, delete data
          this.fieldsStore.clearField(name);
          delete this.instances[name];
          delete this.cachedBind[name];
          return;
        }
        const fieldMeta = this.fieldsStore.getFieldMeta(name);
        if (fieldMeta) {
          const ref = fieldMeta.ref;
          if (ref) {
            if (typeof ref === 'string') {
              throw new Error(`can not set ref string for ${name}`);
            }
            ref(component);
          }
        }
        this.instances[name] = component;
      };

      validateFieldsInternal = (fields, {
        fieldNames,
        action,
        options = {}
      }, callback) => {
        const allRules = {};
        const allValues = {};
        const allFields = {};
        const alreadyErrors = {};
        fields.forEach((field) => {
          const name = field.name;
          if (options.force !== true && field.dirty === false) {
            if (field.errors) {
              set(alreadyErrors, name, { errors: field.errors });
            }
            return;
          }
          const fieldMeta = this.fieldsStore.getFieldMeta(name);
          const newField = {
            ...field
          };
          newField.errors = undefined;
          newField.validating = true;
          newField.dirty = true;
          allRules[name] = this.getRules(fieldMeta, action);
          allValues[name] = newField.value;
          allFields[name] = newField;
        });
        this.setFields(allFields);
        // in case normalize
        Object.keys(allValues).forEach((f) => {
          allValues[f] = this.fieldsStore.getFieldValue(f);
        });
        if (callback && isEmptyObject(allFields)) {
          callback(isEmptyObject(alreadyErrors) ? null : alreadyErrors,
            this.fieldsStore.getFieldsValue(flatFieldNames(fieldNames)));
          return;
        }
        const validator = new AsyncValidator(allRules);
        if (validateMessages) {
          validator.messages(validateMessages);
        }
        validator.validate(allValues, options, (errors) => {
          const errorsGroup = {
            ...alreadyErrors
          };
          if (errors && errors.length) {
            errors.forEach((e) => {
              const fieldName = e.field;
              if (!has(errorsGroup, fieldName)) {
                set(errorsGroup, fieldName, { errors: [] });
              }
              const fieldErrors = get(errorsGroup, fieldName.concat('.errors'));
              fieldErrors.push(e);
            });
          }
          const expired = [];
          const nowAllFields = {};
          Object.keys(allRules).forEach((name) => {
            const fieldErrors = get(errorsGroup, name);
            const nowField = this.fieldsStore.getField(name);
            // avoid concurrency problems
            if (nowField.value !== allValues[name]) {
              expired.push({
                name
              });
            } else {
              nowField.errors = fieldErrors && fieldErrors.errors;
              nowField.value = allValues[name];
              nowField.validating = false;
              nowField.dirty = false;
              nowAllFields[name] = nowField;
            }
          });
          this.setFields(nowAllFields);
          if (callback) {
            if (expired.length) {
              expired.forEach(({ name }) => {
                const fieldErrors = [{
                  message: `${name} need to revalidate`,
                  field: name
                }];
                set(errorsGroup, name, {
                  expired: true,
                  errors: fieldErrors
                });
              });
            }

            callback(isEmptyObject(errorsGroup) ? null : errorsGroup,
              this.fieldsStore.getFieldsValue(flatFieldNames(fieldNames)));
          }
        });
      };

      validateFields = (ns, opt, cb) => {
        const { names, callback, options } = getParams(ns, opt, cb);
        const fieldNames = names || this.fieldsStore.getValidFieldsName();
        const fields = fieldNames
          .filter(name => {
            const fieldMeta = this.fieldsStore.getFieldMeta(name);
            return hasRules(fieldMeta.validate);
          }).map((name) => {
            const field = this.fieldsStore.getField(name);
            field.value = this.fieldsStore.getFieldValue(name);
            return field;
          });
        if (!fields.length) {
          if (callback) {
            callback(null, this.fieldsStore.getFieldsValue(flatFieldNames(fieldNames)));
          }
          return;
        }
        if (!('firstFields' in options)) {
          options.firstFields = fieldNames.filter((name) => {
            const fieldMeta = this.fieldsStore.getFieldMeta(name);
            return !!fieldMeta.validateFirst;
          });
        }
        this.validateFieldsInternal(fields, {
          fieldNames,
          options
        }, callback);
      };

      isSubmitting = () => {
        return this.state.submitting;
      };

      submit = callback => {
        const fn = () => {
          this.setState({
            submitting: false
          });
        };
        this.setState({
          submitting: true
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
            validateFieldsAndScroll: this.validateFieldsAndScroll,
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
