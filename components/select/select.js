import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import s from './style';
import SelectTrigger from './selectTrigger';
import { MenuItem, ItemGroup } from '../menu';
import { toArray } from './util';

const prefixCls = s.selectPrefix;

function noop() {}

const UNSELECTABLE_STYLE = {
  userSelect: 'none',
  WebkitUserSelect: 'none'
}
export default class Select extends Component {
  static defaultProps = {
    showArrow: true,
    dropdownMatchSelectWidth: true,
    disabled: false,
    defaultActiveFirstOption: true,
    allowClear: false,
    defaultOpen: false,
    optionLabelProp: 'value',
    notFoundContent: 'Not Found',
    onSearch: noop,
    prefixCls: prefixCls,
    onFocus: noop,
    onChange: noop,
    defaultValue: undefined
  }

  static PropTypes = {
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    onChange: PropTypes.func,
    showSearch: PropTypes.bool,
    prefixCls: PropTypes.string,
    open: PropTypes.bool,
    filterOption: PropTypes.func
  }

  constructor(props) {
    super(props);
    let open = props.open;
    if (!open) {
      open = props.defaultOpen;
    }
    let value = [];
    if ('value' in props) {
      value = toArray(props.value);
    } else {
      value = toArray(props.defaultValue);
    }
    value = this.addLabelToValue(props, value);
    let inputValue = '';
    let selectedKeys = value.map(v => v.value);
    let combobox = props.mode === 'combobox';
    let multiple = props.mode === 'multiple';
    if (props.showSearch && value.length) {
      inputValue = value[0].label;
    }
    if (combobox) {
      inputValue = props.value;
    }
    if (multiple) {
      inputValue = '';
    }
    this.state = {
      open,
      inputValue,
      selectedKeys,
      value
    }
    this.addBodyClickEvent();
  }
  addLabelToValue = (props, value) => {
    let _value = value;
    if (!_value.length) return _value;
    _value = _value.map(v => ({
      value: v,
      label: this.getLabelToProps(props.children, v)
    }));
    return _value;
  }
  getLabelToProps = (children, value) => {
    if (value === undefined) {
      return null;
    }
    let label = null;
    React.Children.forEach(children, child => {
      if (child.props.isSelectOptGroup && !label) {
        const maybe = this.getLabelToProps(child.props.children, value);
        if (maybe) {
          label = maybe;
        }
      } else if (child.props.value === value && !label) {
        let c = child.props.children;
        if (c.constructor === Array) {
          c = c.join('');
        }
        label = c;
      }
    })
    return label;
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      let value = this.addLabelToValue(nextProps, toArray(nextProps.value));
      let selectedKeys = value.map(v => v.value);
      let inputValue = '';
      let combobox = nextProps.mode === 'combobox';
      let multiple = nextProps.mode === 'multiple';
      if (nextProps.showSearch && value.length) {
        inputValue = value[0].label;
      }
      if (combobox) {
        inputValue = nextProps.value;
      }
      if (multiple) {
        inputValue = '';
      }
      this.setState({
        value,
        selectedKeys,
        inputValue
      })
    }
  }

  componentWillMount() {
    this.adjustOpenState();
  }

  adjustOpenState = () => {
    let open = this.state.open;
    let combobox = this.props.mode === 'combobox';
    let options = [];
    if (open) {
      options = this.renderFilterOptions(this.props.children);
    }
    if (!options.length && !combobox) {
      options = [
        <MenuItem className='disabeld' style={{cursor: 'not-allowed'}} value='NOT_FOUND' key='NOT_FOUND'>{this.props.notFoundContent}</MenuItem>
      ]
    }
    this._options = options;
  }
  componentWillUpdate(nextProps, nextState) {
    this.props = nextProps;
    this.state = nextState;
    this.adjustOpenState();
  }

  componentWillUnMount() {
    this.removeBodyClickEvent();
  }

  renderFilterOptions = (children) => {
    let sel = [];
    const inputValue = this.state.inputValue;
    React.Children.forEach(children, child => {
      if (child.props.isSelectOptGroup) {
        const innerItems = this.renderFilterOptions(child.props.children);
        if (innerItems.length) {
          let label = child.props.label;
          let key = child.key;
          if (!key && typeof label === 'string') {
            key = label;
          } else if (!label && key) {
            label = key;
          }
          sel.push(<ItemGroup key={key} title={label}>{innerItems}</ItemGroup>)
        }
        return;
      }
      const childValue = child.props.value || child.props.key || '';
      if (this.filterOption(inputValue, child)) {
        sel.push(<MenuItem value={childValue} key={childValue} {...child.props}/>);
      }
    });
    return sel;
  }

  filterOption = (inputValue, child) => {
    if (!inputValue) {
      return true;
    }
    if ('filterOption' in this.props) {
      if (typeof filterFn === 'function') {
        return filterFn.call(this, inputValue, child);
      }
    } else {
      return this.defaultFilterFn(inputValue, child);
    }
    return true;
  }

  defaultFilterFn = (inputValue, child) => {
    let combobox = this.props.mode === 'combobox';
    let c = child.props.children;
    if (c.constructor === Array) {
      c = c.join('');
    }
    return c.indexOf(inputValue) > -1 || child.props.value.indexOf(inputValue) > -1 || combobox;
  }

  onInputChange = (e) => {
    e.stopPropagation();
    const value = e.target.value;
    let combobox = this.props.mode === 'combobox';
    let multiple = this.props.mode === 'multiple';
    this.setState({
      open: true,
      inputValue: value
    }, () => {
      // if (!value) return;
      // let count = 0;
      // let selectedKeys = [];
      // let labelValue;
      // let oldLabelValue = {...this.state.labelValue};
      // let oldSelectedKeys = [...this.state.selectedKeys];
      // React.Children.forEach(this._options, child => {
      //   if (child.type.displayName === 'MenuItem' && count === 0 && child.props.value !== 'NOT_FOUND') {
      //     count++;
      //     selectedKeys = [child.props.value];
      //     labelValue = {
      //       value: child.props.value,
      //       label: child.props.children
      //     }
      //   } else if (child.type.displayName === 'ItemGroup' && count === 0) {
      //     count++;
      //     const c = child.props.children[0];
      //     selectedKeys = [c.props.value];
      //     labelValue = {
      //       value: c.props.value,
      //       label: c.props.children
      //     }
      //   }
      // });
      // this.setState({
      //   selectedKeys: selectedKeys.length ? selectedKeys : oldSelectedKeys,
      //   labelValue: labelValue || oldLabelValue
      // });
    })
    // if ('mode' in this.props) {
    //   if (this.props.mode) {
    //     this.props.onChange(value);
    //   }
    // }
    if (combobox) {
      this.props.onChange(value);
    }
    if (multiple) {
      let width = this.refs.mirror.clientWidth + 10;
      width = width > this.topCtrlNode.clientWidth ? this.topCtrlNode.clientWidth : width;
      this.refs.input.style.width = width + 'px';
    }
  }

  onInputFocus = e => {
    e.stopPropagation();
    const combobox = this.props.mode === 'combobox';
    if (!combobox) {
      this.setState({
        inputValue: ''
      });
    }
  }

  addBodyClickEvent = () => {
    let combobox = this.props.mode === 'combobox';
    let multiple = this.props.mode === 'multiple';
    if (!this.bodyEvent) {
      document.addEventListener('click', () => {
        let { open, value } = this.state;
        if (open) {
          this.setState({
            open: false
          });
          if (!combobox) {
            if (value.length && !multiple && this.props.showSearch) {
              this.setState({
                inputValue: value[0].label
              })
            } else {
              this.setState({
                inputValue: ''
              })
              if (this.refs.input) {
                this.refs.input.style.width = '10px';
              }
            }
          }
        }
      }, false);
      this.bodyEvent = true;
    }
  }

  removeBodyClickEvent = () => {
    if (this.bodyEvent) {
      document.removeEventListener('click');
      this.bodyEvent = false;
    }
  }

  onOuterClick = e => {
    e.nativeEvent.stopImmediatePropagation();
    this.setState({
      open: true
    });
    if (this.refs.input) {
      this.refs.input.focus();
    }
  }

  getPlaceholderElement() {
    const { inputValue, value } = this.state;
    let hidden = false;
    if (inputValue) {
      hidden = true;
    }
    if (value.length) {
      hidden = true;
    }
    const placeholder = this.props.placeholder;
    if (placeholder) {
      return (
        <div
          className={`${prefixCls}-selection-placeholder`}
          style={{
            display: hidden ? 'none' : 'block',
            ...UNSELECTABLE_STYLE
          }}
        >
          {placeholder}
        </div>
      )
    }
    return null;
  }

  getInputElement() {
    let { inputValue } = this.state;
    return (
      <div className={`${prefixCls}-search-field-wrap`}>
        <input className={`${prefixCls}-search-field`} ref='input' value={inputValue || ''} onChange={this.onInputChange} disabled={this.props.disabled} onFocus={this.onInputFocus}/>
        <span ref='mirror' className={`${prefixCls}-search-mirror`}>{inputValue || ''}</span>
      </div>
    )
  }

  renderTopControlNode() {
    const { open, inputValue, value } = this.state;
    const props = this.props;
    const { showSearch } = props;
    const className = `${prefixCls}-selection-rendered`;
    let innerNode = null;
    let selectedValue = null;
    let multiple = props.mode === 'multiple';
    if (value.length) {
      let showSelectedValue = false;
      let opacity = 1;
      if (!showSearch) {
        showSelectedValue = true;
      } else {
        if (open) {
          showSelectedValue = !inputValue; // 此时未输入
          if (showSelectedValue) {
            opacity = 0.4;
          }
        } else {
          showSelectedValue = false;
        }
      }
      selectedValue = (
        <div key='value'
          className={`${prefixCls}-selection-selected-value`}
          style={{
            opacity,
            display: showSelectedValue ? 'block' : 'none'
          }}
        >
          {
            value[0].label
          }
        </div>
      )
    }
    if (multiple) {
      selectedValue = (
        <ul key='ul' className={`${prefixCls}-selection-choice-list`}>
          {
            value.length ? value.map((item, index) => {
              return (
                <li key={index} className={`${prefixCls}-selection-choice`}>
                  <div className={`${prefixCls}-selection-choice-content`}>{item.label}</div>
                  <span className={`${prefixCls}-selection-choice-remove`} onClick={e => this.removeChoice(index, e)}>x</span>
                </li>
              )
            }) : null
          }
          {
            value.length ? <li key='input' className={`${prefixCls}-search-inline`}>{this.getInputElement()}</li> : null
          }
        </ul>
      )
    }
    if (!multiple) {
      if (!showSearch) {
        innerNode = [selectedValue];
      } else {
        innerNode = [selectedValue, <div className={`${prefixCls}-search`} key='input'>
          {this.getInputElement()}
        </div>];
      }
    } else {
      innerNode = [selectedValue];
    }

    return (
      <div ref={node => { this.topCtrlNode = node; }} className={className}>
        {this.getPlaceholderElement()}
        {innerNode}
      </div>
    )
  }
  removeChoice = (index, e) => {
    e.nativeEvent.stopImmediatePropagation();
    const value = this.state.value;
    value.splice(index, 1);
    this.setState({value});
  }
  onMenuSelect = (selectedKeys) => {
    const multiple = this.props.mode === 'multiple';
    if (!multiple && !selectedKeys.length) {
      this.setState({
        open: false,
        value: this.state.value,
        inputValue: this.props.showSearch ? this.state.value[0].label : ''
      })
      return;
    };
    let value = this.addLabelToValue(this.props, selectedKeys);

    this.setState({
      selectedKeys,
      value
    });
    if (this.props.showSearch && !multiple) {
      this.setState({
        inputValue: value[0].label
      })
    }
    if (multiple) {
      this.setState({
        inputValue: ''
      })
    }
    this.setState({
      open: multiple
    })
    // this.props.onChange(value.map(v => v.value).join(','));
    this.props.onChange(selectedKeys);
  }

  render() {
    const props = this.props;
    const { open, inputValue, selectedKeys } = this.state;
    const { allowClear, disabled, className, style, showArrow, mode, size } = props;
    const combobox = mode === 'combobox';
    const multiple = mode === 'multiple';
    const clear = (<span key='clear' className={`${prefixCls}-selection-clear`}></span>);
    const rootCls = {
      [`${prefixCls}-open`]: open,
      [`${prefixCls}-focused`]: open,
      [`${prefixCls}-combobox`]: combobox,
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-enabled`]: !disabled,
      [`${prefixCls}-allow-clear`]: allowClear
    };
    const ctrlNode = this.renderTopControlNode();
    const options = this._options;
    return (
      <SelectTrigger
        ref='trigger'
        dropdownStyle={props.dropdownStyle}
        dropdownClassName={props.dropdownClassName}
        inputValue={inputValue}
        visible={open}
        dropdownMatchSelectWidth={props.dropdownMatchSelectWidth}
        disabled={props.disabled}
        defaultActiveFirstOption={props.defaultActiveFirstOption}
        options={options}
        getPopupContainer={props.getPopupContainer}
        prefixCls={prefixCls}
        onMenuSelect={this.onMenuSelect}
        selectedKeys={selectedKeys}
        multiple={multiple}
        disabled={disabled}
      >
        <div ref='root'
          style={style}
          className={cn(className, prefixCls, rootCls)}
          onClick={disabled ? noop : this.onOuterClick}
        >
          <div ref='selection'
            className={cn(`${prefixCls}-selection`, {[`${prefixCls}-selection-sm`]: size === 'small', [`${prefixCls}-selection-lg`]: size === 'large'})}
            role="combobox"
            aria-haspopup="true"
            aria-expanded={open}
          >
            {ctrlNode}
            {
              allowClear ? clear : null
            }
            {
              !showArrow || multiple ? null : <span key='arrow' className={`${prefixCls}-arrow`} onClick={this.onArrowClick}></span>
            }
          </div>
        </div>
      </SelectTrigger>
    )
  }
}
