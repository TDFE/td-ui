/**
 * Created by wxy on 2017/6/16.
 */
import React, { Component } from 'react';
import classNames from 'classnames';
import _ from 'lodash/core'
import Input from '../input/index'
import s from './style/index';

const prefixCls = s.cascaderPrefix;

class CascaderMenu extends Component {
  handleClick = (selectedIndex, type) => {
    return () => {
      const { level, options } = this.props;
      this.props.menuItemClickCallback(level, selectedIndex, options, type);
    }
  }

  render () {
    const { options, selectedIndex, hoverOpen } = this.props;
    return (
      <ul className={ `${prefixCls}-menu` }>
        {
          options.map((it, index) => (
            <li
              key={index}
              onClick={ this.handleClick(index, 'click') }
              onMouseOver={ hoverOpen ? this.handleClick(index, 'mouseover') : null}
              className={ classNames({
                [`${prefixCls}-menu-item`]: true,
                active: selectedIndex === index
              })}
            >
              { it.label }
            </li>
          ))
        }
      </ul>
    )
  }
}

class Cascader extends Component {
  constructor(props) {
    super(props);
    this.getValuesOptions = this.getValuesOptions.bind(this);
    this.state = {
      menuArray: [],
      menuOpen: false,
      isValueSet: false,
      valuesOptions: []
    }
  }

  static defaultProps = {
    prefixCls: 'td-cascader',
    placeholder: '请选择'
  }

  handleCascaderPickerClick = () => {
    const { menuArray, menuOpen } = this.state;
    console.log(this.state);
    const { options } = this.props;
    if (menuArray.length === 0) {
      const menuMap = { level: 0, selectedIndex: -1, options }
      menuArray.push(menuMap);
      this.setState({'menuArray': menuArray});
    }
    this.setState({ menuOpen: !menuOpen });
  }

  handleCascaderMenuClick = (level, selectedIndex, options, type) => {
    if (!options || options.length === 0) return

    let { menuArray } = this.state;
    const menuArrayClone = [];
    menuArray.map(it => menuArrayClone.push(_.clone(it)));
    menuArray = [];

    for (let i = 0; i <= level; i++) {
      menuArray.push({
        level: menuArrayClone[i].level,
        selectedIndex: level === i ? selectedIndex : menuArrayClone[i].selectedIndex,
        options: menuArrayClone[i].options
      })
    }

    let childLevel = level + 1;
    let childSelectedIndex = -1;
    let childOptions = options[selectedIndex].children;

    if (childOptions && childOptions.length > 0) {
      let childMenuMap = { level: childLevel, selectedIndex: childSelectedIndex, options: childOptions }

      menuArray.push(childMenuMap);
      this.setState({ 'menuArray': menuArray, isValueSet: false });
    } else {
      if (type === 'click') this.setState({ 'menuArray': menuArray, isValueSet: true, menuOpen: false })
      let selectedOptions = [];
      for (let menu of menuArray) {
        selectedOptions.push(menu.options[menu.selectedIndex])
      }
      if (type === 'click') this.setState({ 'valuesOptions': selectedOptions })
      let { onChange } = this.props;
      if (onChange) onChange(options[selectedIndex].value);
    }
  }

  getValuesOptions = (options, values) => {
    let valuesOptions = [];
    if (!options || options.length === 0 || !values || values.length === 0) return valuesOptions;
    let valueOption = options.find(it => it.value === values[0]);
    let restValues = values.slice(1);

    if (valueOption) valuesOptions.push(valueOption)

    if (valueOption && valueOption.children && valueOption.children.length > 0 && restValues.length > 0) {
      valuesOptions.push(...this.getValuesOptions(valueOption.children, restValues))
    }
    return valuesOptions;
  }

  handleComponentUpdate = (props, firstRun) => {
    let { options, values } = props;

    if (!options || !values || options.length === 0 || values.length === 0) return

    let valuesOptions = this.getValuesOptions(options, values);
    this.setState({ valuesOptions });
  }

  render () {
    let { placeholder, showEnd, allowClear, hoverOpen } = this.props;
    let { menuArray, menuOpen, isValueSet, valuesOptions } = this.state;
    return (
      <div className={ prefixCls }>
        <div className={`${prefixCls}-picker`} onClick={this.handleCascaderPickerClick}>
          <div className="input-wrapper">
            <Input
              type="text"
              size="small"
              readOnly
              placeholder={!isValueSet && !(valuesOptions && valuesOptions.length > 0) ? placeholder : ''}
            />
          </div>
          <div className="picker-label">
            {
              showEnd ? (<div>{ valuesOptions.length ? valuesOptions[valuesOptions.length - 1].label : '' }</div>)
                : isValueSet ? menuArray.map((it, index) => (
                  <div key={index}>{it.selectedIndex >= 0 ? it.options[it.selectedIndex].label : '' }
                    {index < menuArray.length - 1 ? <span>/</span> : null}
                  </div>))
                    : valuesOptions.map((it, index) => (
                    <div key={index}>{it.label}
                      {index < valuesOptions.length - 1 ? <span>/</span> : null}
                    </div>))
            }
          </div>
          {
            allowClear ? (<i className="picker-clear" onClick={ () => this.setState({menuArray: [], menuOpen: false, isValueSet: false, valuesOptions: []}) } >x</i>) : ''
          }
        </div>

       {
          menuOpen ? (
            <div className={`${prefixCls}-menus`}>
              {
                menuArray.map((it, index) => (
                  <CascaderMenu key={index} hoverOpen={hoverOpen} {...{
                    level: it.level,
                    selectedIndex: it.selectedIndex,
                    options: it.options,
                    menuItemClickCallback: this.handleCascaderMenuClick
                  }} />
                ))
              }
            </div>
          ) : null
        }
      </div>
    )
  }

  componentWillReceiveProps (nextProps) {
    this.handleComponentUpdate(nextProps, false);
  }

  componentDidMount () {
    this.handleComponentUpdate(this.props, true);
  }
}

export default Cascader;
