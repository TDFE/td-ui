/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-07-04 10:41:20
 * @Last modified by:   yzf
 * @Last modified time: 2017-07-04 10:41:53
 */

import React from 'react';
import Checkbox from '../checkbox';
import Dropdown from '../dropdown';
import Menu from '../menu';
import Icon from '../icon';
import classNames from 'classnames';

export default class SelectionCheckboxAll extends React.Component {
  constructor(props) {
    super(props);

    this.defaultSelections = [{
      key: 'all',
      text: props.locale.selectAll,
      onSelect: () => {}
    }, {
      key: 'invert',
      text: props.locale.selectInvert,
      onSelect: () => {}
    }];

    this.state = {
      checked: this.getCheckState(props),
      indeterminate: this.getIndeterminateState(props)
    };
  }

  componentDidMount() {
    this.subscribe();
  }

  componentWillReceiveProps(nextProps) {
    this.setCheckState(nextProps);
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  subscribe() {
    const { store } = this.props;
    this.unsubscribe = store.subscribe(() => {
      this.setCheckState(this.props);
    });
  }

  checkSelection(data, type, byDefaultChecked) {
    const { store, getCheckboxPropsByItem, getRecordKey } = this.props;
    // type should be 'every' | 'some'
    if (type === 'every' || type === 'some') {
      return (
        byDefaultChecked
          ? data[type]((item, i) => getCheckboxPropsByItem(item, i).defaultChecked)
          : data[type]((item, i) => store.getState().selectedRowKeys.indexOf(getRecordKey(item, i)) >= 0)
      );
    }
    return false;
  }

  setCheckState(props) {
    const checked = this.getCheckState(props);
    const indeterminate = this.getIndeterminateState(props);
    if (checked !== this.state.checked) {
      this.setState({ checked });
    }
    if (indeterminate !== this.state.indeterminate) {
      this.setState({ indeterminate });
    }
  }

  getCheckState(props) {
    const { store, data } = props;
    let checked;
    if (!data.length) {
      checked = false;
    } else {
      checked = store.getState().selectionDirty
        ? this.checkSelection(data, 'every', false)
        : (
          this.checkSelection(data, 'every', false) ||
          this.checkSelection(data, 'every', true)
        );
    }
    return checked;
  }

  getIndeterminateState(props) {
    const { store, data } = props;
    let indeterminate;
    if (!data.length) {
      indeterminate = false;
    } else {
      indeterminate = store.getState().selectionDirty
        ? (
          this.checkSelection(data, 'some', false) &&
          !this.checkSelection(data, 'every', false)
        )
        : ((this.checkSelection(data, 'some', false) &&
          !this.checkSelection(data, 'every', false)) ||
          (this.checkSelection(data, 'some', true) &&
          !this.checkSelection(data, 'every', true))
        );
    }
    return indeterminate;
  }

  handleSelectAllChagne = (e) => {
    let checked = e.target.checked;
    this.props.onSelect(checked ? 'all' : 'removeAll', 0, null);
  }

  renderMenus(selections) {
    return selections.map((selection, index) => {
      return (
        <Menu.Item
          key={selection.key || index}
        >
          <div
            onClick={() => { this.props.onSelect(selection.key, index, selection.onSelect); }}
          >
            {selection.text}
          </div>
        </Menu.Item>
      );
    });
  }

  render() {
    const { disabled, prefixCls, selections, getPopupContainer } = this.props;
    const { checked, indeterminate } = this.state;

    let selectionPrefixCls = `${prefixCls}-selection`;

    let customSelections = null;

    if (selections) {
      let newSelections = Array.isArray(selections) ? this.defaultSelections.concat(selections) : this.defaultSelections;

      let menu = (
        <Menu
          className={`${selectionPrefixCls}-menu`}
          selectedKeys={[]}
        >
          {this.renderMenus(newSelections)}
        </Menu>
      );

      customSelections = (
        <Dropdown
          overlay={menu}
          getPopupContainer={getPopupContainer}
        >
          <div className={`${selectionPrefixCls}-down`}>
            <Icon type="down" />
          </div>
        </Dropdown>
      );
    }

    return (
      <div className={selectionPrefixCls}>
        <Checkbox
          className={classNames({ [`${selectionPrefixCls}-select-all-custom`]: customSelections })}
          checked={checked}
          indeterminate={indeterminate}
          disabled={disabled}
          onChange={this.handleSelectAllChagne}
        />
        {customSelections}
      </div>
    );
  }
}
