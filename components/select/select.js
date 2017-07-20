
/* eslint-disable */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import s from './style';
import assign from 'object-assign';
import classes from 'component-classes';
import SelectTrigger from './selectTrigger';
import { MenuItem, ItemGroup } from '../menu';
const prefixCls = s.selectPrefix;
const KeyCode = {
  ENTER: 13,
  ESC: 27,
  BACKSPACE: 8,
  DOWN: 40
}

function noop() {}

const UNSELECTABLE_STYLE = {
  userSelect: 'none',
  WebkitUserSelect: 'none',
}
// 暂不考虑mode的情况
//考虑mode='combobox'的情况
export default class Select extends Component {
  static defaultProps = {
    showArrow: true,
    dropdownMatchSelectWidth: true,
    disabled: false,
    defaultActiveFirstOption: true,
    allowClear: false,
    defaultOpen: false,
    optionLabelProp: 'value',
    optionLabelProp: 'value',
    notFoundContent: 'Not Found',
    onSearch: noop,
    prefixCls: prefixCls,
    onFocus: noop,
    filterOption: true,
    notFoundContent: 'Not Found',
    onChange: noop,
    defaultValue: ''
  }
  static PropTypes = {
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    onChange: PropTypes.func,
    showSearch: PropTypes.bool,
    prefixCls: PropTypes.string
  }
  constructor(props) {
    super(props);
    let open = props.open;
    if (!open) {
      open = props.defaultOpen;
    }
    let value = [];
    if ('value' in props) {
      value = props.value;
    } else {
      value = props.defaultValue;
    }
    let inputValue = '';
    let labelValue = {...this.addLabelValue(value, props)};
    let selectedKeys = [labelValue.value + ''];
    if (labelValue.value && props.showSearch) {
      inputValue = labelValue.label
    }
    this.state = {
      open,
      inputValue,
      labelValue,
      selectedKeys
    }
    this.addBodyClickEvent();
  }
  addLabelValue = (value, props) => {
    let label = value + '';
    let _value = value + '';
    const loop = children => {
      let count = 0;
      React.Children.forEach(children, child => {
        if (child.props.isSelectOptGroup) {
          loop(child.props.children);
        } else if (child.type.isSelectOption) {
          let c = child.props.children;
          if (c.constructor === Array) {
            c = c.join('');
          }
          if (value + '' === child.props.value + '' || value + '' === c + '' && count === 0) {
            count++;
            label = c;
            _value = child.props.value;
          }
        }
      })
    }
    loop(props.children);
    return {
      label: label,
      value: _value
    }
  }
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      let labelValue = {...this.addLabelValue(nextProps.value, nextProps)};
      let selectedKeys = [labelValue.value + ''];
      let inputValue = '';
      if (labelValue.value && nextProps.showSearch) {
        inputValue = labelValue.label
      }
      this.setState({
        labelValue,
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
    let combobox = this.props.mode;
    let options = [];
    if (open) {
      options = this.renderFilterOptions(this.props.children);
    }
    if (!options.length && !combobox) {
      options = [
        <MenuItem className='disabeld' value='NOT_FOUND' key='NOT_FOUND'>{this.props.notFoundContent}</MenuItem>
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

    })
    return sel;
  }
  defaultFilterFn = () => {

  }
  filterOption = (inputValue, child) => {
    if (!inputValue) {
      return true;
    }
    let filterFn = this.props.filterOption;
    let c = child.props.children;
    if (c.constructor === Array) {
      c = c.join('');
    }
    if (c.indexOf(inputValue) > -1 || child.props.value.indexOf(inputValue) > -1) {
      return true;
    }
    // if ('filterOption' in this.props) {
    //   if (this.props.filterOption === true) {
    //     if (c.indexOf(inputValue) > -1 || child.props.value.indexOf(inputValue) > -1) {
    //       return true;
    //     }
    //   };
    // } else {
    //   if (c.indexOf(inputValue) > -1 || child.props.value.indexOf(inputValue) > -1) {
    //     return true;
    //   }
    // }
    return false;
  }
  onArrowClick = () => {

  }
  onInputChange = (e) => {
    e.stopPropagation();
    const value = e.target.value;
    this.setState({
      open: true,
      inputValue: value
    }, () => {
      if (!value) return;
      let count = 0;
      let selectedKeys = [];
      let labelValue;
      let oldLabelValue = {...this.state.labelValue};
      let oldSelectedKeys = [...this.state.selectedKeys];
      React.Children.forEach(this._options, child => {
        if (child.type.displayName === 'MenuItem' && count === 0 && child.props.value !== 'NOT_FOUND') {
          count++;
          selectedKeys = [child.props.value];
          labelValue = {
            value: child.props.value,
            label: child.props.children
          }
        } else if (child.type.displayName === 'ItemGroup' && count === 0) {
          count++;
          const c = child.props.children[0];
          selectedKeys = [c.props.value];
          labelValue = {
            value: c.props.value,
            label: c.props.children
          }
        }
      })
      this.setState({
        selectedKeys: selectedKeys.length ? selectedKeys : oldSelectedKeys,
        labelValue: labelValue || oldLabelValue
      })
    })
    if ('mode' in this.props) {
      if (this.props.mode) {
        this.props.onChange(value);
      }
    }
  }
  onInputFocus = e => {
    e.stopPropagation();
    const combobox = this.props.mode;
    if (!combobox) {
      this.setState({
        inputValue: ''
      })
    }
  }
  addBodyClickEvent = () => {
    if (!this.bodyEvent) {
      document.addEventListener('click', () => {
        let { open, labelValue, inputValue } = this.state;
        if (open) {
          this.setState({
            open: false
          })
          if (this.props.showSearch) {
            if (labelValue && labelValue.value) {
              this.setState({
                inputValue: labelValue.label
              })
            } else {
              this.setState({
                inputValue: ''
              })
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
    })
  }
  updateFocusClassName = () => {
    const { refs, props } = this;
    if (this._focused) {
      classes(refs.root).add(`${prefixCls}-focused`);
    } else {
      classes(refs.root).remove(`${prefixCls}-focused`);
    }
  }
  getPlaceholderElement() {
    const { inputValue, value, labelValue } = this.state;
    let hidden = false;
    if (inputValue) {
      hidden = true;
    }
    if (labelValue && labelValue.value) {
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
    const props = this.props;
    let { inputValue } = this.state;
    return (
      <div className={`${prefixCls}-search-field-wrap`}>
        <input className={`${prefixCls}-search-field`} value={inputValue} onChange={this.onInputChange} disabled={props.Disabled} onFocus={this.onInputFocus}/>
      </div>
    )
  }
  renderTopControlNode() {
    const { value, open, inputValue, labelValue } = this.state;
    const props = this.props;
    const { showSearch } = props;
    const className = `${prefixCls}-selection-rendered`;
    let innerNode = null;
    let selectedValue = null;
    if (labelValue && labelValue.value) {
      let showSelectedValue = false;
      let opacity = 1;
      if (!showSearch) {
        showSelectedValue = true;
      } else {
        if (open) {
          showSelectedValue = !inputValue; //此时未输入
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
            labelValue.label
          }
        </div>
      )
    }
    if (!showSearch) {
      innerNode = [selectedValue];
    } else {
      innerNode = [selectedValue, <div className={`${prefixCls}-search`} key='input'>
        {this.getInputElement()}
      </div>];
    }
    return (
      <div ref={node => this.topCtrlNode = node} className={className}>
        {this.getPlaceholderElement()}
        {innerNode}
      </div>
    )
  }
  onPopupFocus = () => {
    console.log(1);
  }
  onMenuSelect = (selectedKeys) => {
    const oldValue = this.state.labelValue.value;
    const value = selectedKeys[0];
    let labelValue = {...this.addLabelValue(value, this.props)};
    this.setState({
      labelValue,
      selectedKeys
    });
    if (this.props.showSearch) {
      this.setState({
        inputValue: labelValue.label
      })
    }
    if (value !== oldValue){
      this.props.onChange(value);
    }
    if (this.menuItemTimer) {
      clearTimeout(this.menuItemTimer);
      this.menuItemTimer = null;
    }
    if (!this.menuItemTimer) {
      this.menuItemTimer = setTimeout(() => {
        this.setState({
          open: false
        })
        this.updateFocusClassName();
      },100)
    }

  }
  render() {
    const props = this.props;
    const { open, inputValue, value, labelValue, selectedKeys } = this.state;
    const { allowClear, disabled, className, style, showArrow, mode, size } = props;
    const multiple = mode === 'multiple';
    const tags = mode === 'tags';
    const combobox = mode === 'combobox';
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
      >
        <div ref='root'
          style={style}
          className={cn(className, prefixCls, rootCls)}
          onClick={this.onOuterClick}
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
              !showArrow ? null : <span key='arrow' className={`${prefixCls}-arrow`} onClick={this.onArrowClick}></span>
            }
          </div>
        </div>
      </SelectTrigger>
    )
  }
}
