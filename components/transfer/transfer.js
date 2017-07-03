import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './style';
import _ from 'lodash';
import classnames from 'classnames';
import Button from '../button';
import { getInnerDataSource, getListData, checkChildren, getLength, getAllKey, checkChildrenAllSelected } from './util'

export default class Transfer extends Component {
  static defaultProps = {
    prefixCls: s.transferPrefix,
    dataSource: [],
    searchPlaceholder: '请输入搜索内容',
    notFoundContent: '列表为空',
    showSearch: false,
    operations: ['>', '<'],
    titles: ['', '']
  }

  static propTypes = {
    dataSource: PropTypes.array,
    defaultValue: PropTypes.array,
    value: PropTypes.array,
    sourceSelectedKeys: PropTypes.array,
    targetSelectedKeys: PropTypes.array,
    showSearch: PropTypes.bool,
    operations: PropTypes.array,
    titles: PropTypes.array,
    searchPlaceholder: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    notFoundContent: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    onChange: PropTypes.func,
    onSourceSelectedKeysChange: PropTypes.func,
    onTargetSelectedKeysChange: PropTypes.func
  }

  constructor(props) {
    super(props);
    let value = props.defaultValue || [];
    let sourceSelectedKeys = props.defaultSourceSelectedKeys || [];
    let targetSelectedKeys = props.defaultTargetSelectedKeys || [];
    let dataSource = [];
    if ('value' in props) {
      value = props.value || [];
    }
    if ('sourceSelectedKeys' in props) {
      sourceSelectedKeys = props.sourceSelectedKeys || [];
    }
    if ('targetSelectedKeys' in props) {
      targetSelectedKeys = props.targetSelectedKeys || [];
    }
    if ('dataSource' in props) {
      dataSource = getInnerDataSource(props.dataSource);
    }
    this.state = {
      value,
      sourceSelectedKeys,
      targetSelectedKeys,
      dataSource
    }
  }

  componentWillReceiveProps(nextProps) {
    const props = {};
    if ('value' in nextProps) {
      props.value = nextProps.value || [];
    }
    if ('sourceSelectedKeys' in nextProps) {
      props.sourceSelectedKeys = nextProps.sourceSelectedKeys || [];
    }
    if ('targetSelectedKeys' in nextProps) {
      props.targetSelectedKeys = nextProps.targetSelectedKeys || [];
    }
    if ('dataSource' in nextProps) {
      props.dataSource = getInnerDataSource(nextProps.dataSource);
    }
    this.setState(props);
  }

  toggleState = (key, _key, type, isSelected) => {
    const stateKey = `${type}SelectedKeys`;
    const selectedKeys = this.state[stateKey];
    const eventKey = `on${_.upperFirst(type)}SelectedKeysChange`;
    let listData = this.state.dataSource;
    const _keyArr = _key.split('-');
    let nextSelectedKeys = selectedKeys;

    // 影响的节点
    let doList = [key];
    let thisNode = '';
    let checkList = {};
    for (let i = 0; i < _keyArr.length; i++) {
      thisNode = listData[_keyArr[i]];
      listData = thisNode.children;
      checkList[thisNode.key] = _.cloneDeep(thisNode.children);
    }
    const list = [key].concat(selectedKeys);
    for (let i in checkList) {
      if (checkChildrenAllSelected(checkList[i], list)) {
        doList.push(i);
      }
    }
    const loopList = (list) => {
      if (list && list.length > 0) {
        _.each(list, item => {
          doList.push(item._key);
          item.children && loopList(item.children);
        });
      }
    }
    loopList(thisNode && thisNode.children);

    if (isSelected) {
      // 去除选择
      nextSelectedKeys = selectedKeys;
      _.remove(nextSelectedKeys, item => doList.indexOf(item) >= 0);
    } else {
      // 去除选择
      nextSelectedKeys = doList.concat(selectedKeys);
    }
    nextSelectedKeys = _.uniq(nextSelectedKeys);
    if (this.props[eventKey]) {
      this.props[eventKey](nextSelectedKeys);
    } else {
      this.setState({
        [stateKey]: nextSelectedKeys
      });
    }
  }

  selectedAll = (type, disabled, isAllSelected, dataList) => {
    if (disabled) {
      return
    }
    if (type === 'target') {
      if (isAllSelected) {
        this.setState({
          targetSelectedKeys: []
        });
      } else {
        this.setState({
          targetSelectedKeys: getAllKey(dataList)
        });
      }
    } else {
      if (isAllSelected) {
        this.setState({
          sourceSelectedKeys: []
        });
      } else {
        this.setState({
          sourceSelectedKeys: getAllKey(dataList)
        });
      }
    }
  }

  changeValue = (type) => {
    let newValue;
    const { sourceSelectedKeys, targetSelectedKeys, value } = this.state;
    if (type === 'target') {
      newValue = sourceSelectedKeys.concat(value);
      this.setState({
        sourceSelectedKeys: []
      });
    } else {
      newValue = _.remove(value, item => targetSelectedKeys.indexOf(item) < 0);
      this.setState({
        targetSelectedKeys: []
      });
    }
    newValue = _.uniq(newValue);
    if (this.props.onChange) {
      this.props.onChange(newValue)
    } else {
      this.setState({
        value: newValue
      });
    }
  }

  renderItem = (datas, type, level = 0) => {
    const { prefixCls, notFoundContent } = this.props;
    if (datas.length > 0) {
      return datas.map((item, index) => {
        const typeArr = this.state[`${type}SelectedKeys`];
        const itemClass = classnames(`${prefixCls}-checkbox`, {
          [`${prefixCls}-checkbox-checked`]: typeArr.indexOf(item.key) >= 0,
          [`${prefixCls}-checkbox-indeterminate`]: typeArr.indexOf(item.key) < 0 && item.children && checkChildren(item.children, typeArr)
        });
        return (
          <div key={item.key}>
            <div
              className={`${prefixCls}-con-item`}
              onClick={() => {
                this.toggleState(item.key, item._key, type, typeArr.indexOf(item.key) >= 0)
              }}
              style={{paddingLeft: level * 23 + 15}}
            >
              <span className={itemClass}></span>{item.title}
            </div>
            { item.children && this.renderItem(item.children, type, level + 1) }
          </div>
        );
      })
    } else if (level === 0) {
      return <div className="null">{notFoundContent}</div>
    }
  }

  render() {
    const { prefixCls, operations, titles } = this.props;
    const { sourceSelectedKeys, targetSelectedKeys, value, dataSource } = this.state;
    const {
      source,
      target
    } = getListData(dataSource, value);
    const sourceLength = getLength(source);
    const targetLength = getLength(target);
    const sourceAllSelected = sourceLength !== 0 && sourceLength === sourceSelectedKeys.length;
    const targetAllSelected = targetLength !== 0 && targetLength === targetSelectedKeys.length;

    return (<div className={`${prefixCls}`}>
      <div className={`${prefixCls}-box ${prefixCls}-source`}>
        <div className={`${prefixCls}-title`}>
          <span className="fr">{titles[0]}</span>
          <span
            onClick={this.selectedAll.bind(this, 'source', sourceLength === 0, sourceAllSelected, source)}
            className={
              classnames(`${prefixCls}-checkbox`, {
                [`${prefixCls}-checkbox-disabled`]: sourceLength === 0,
                [`${prefixCls}-checkbox-checked`]: sourceAllSelected,
                [`${prefixCls}-checkbox-indeterminate`]: sourceSelectedKeys.length > 0 && sourceSelectedKeys.length < sourceLength
              })
            }></span>
          { sourceSelectedKeys && sourceSelectedKeys.length > 0 ? `${sourceSelectedKeys.length}/` : '' }
          { sourceLength }
        </div>
        <div className={`${prefixCls}-con`}>
          {
            this.renderItem(source, 'source')
          }
        </div>
      </div>
      <div className={`${prefixCls}-middle`}>
        <div className={`${prefixCls}-middle-inner`}>
          <div>
            <Button
              type='primary'
              onClick={this.changeValue.bind(this, 'target')}
              disabled={sourceSelectedKeys.length <= 0}
            >{ operations[0] }</Button>
          </div>
          <div>
            <Button
              type='primary'
              onClick={this.changeValue.bind(this, 'source')}
              disabled={targetSelectedKeys.length <= 0}
            >{ operations[1] }</Button>
          </div>
        </div>
      </div>
      <div className={`${prefixCls}-box ${prefixCls}-target`}>
        <div className={`${prefixCls}-title`}>
          <span className="fr">{titles[1]}</span>
          <span
            onClick={this.selectedAll.bind(this, 'target', targetLength === 0, targetAllSelected, target)}
            className={
              classnames(`${prefixCls}-checkbox`, {
                [`${prefixCls}-checkbox-disabled`]: targetLength === 0,
                [`${prefixCls}-checkbox-checked`]: targetAllSelected,
                [`${prefixCls}-checkbox-indeterminate`]: targetSelectedKeys.length > 0 && targetSelectedKeys.length < targetLength
              })
            }
          ></span>
          { targetSelectedKeys && targetSelectedKeys.length > 0 ? `${targetSelectedKeys.length}/` : '' }
          { targetLength }
        </div>
        <div className={`${prefixCls}-con`}>
          {
            this.renderItem(target, 'target')
          }
        </div>
      </div>
    </div>)
  }
}
