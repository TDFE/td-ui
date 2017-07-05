/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-07-04 10:37:01
 * @Last modified by:   yzf
 * @Last modified time: 2017-07-04 10:37:05
 */

import React from 'react';
import Checkbox from '../checkbox';
import Radio from '../radio';

export default class SelectionBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: this.getCheckState(props)
    };
  }

  componentDidMount() {
    this.subscribe();
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  subscribe() {
    const { store } = this.props;
    this.unsubscribe = store.subscribe(() => {
      const checked = this.getCheckState(this.props);
      this.setState({ checked });
    });
  }

  getCheckState(props) {
    const { store, defaultSelection, rowIndex } = props;
    let checked = false;
    if (store.getState().selectionDirty) {
      checked = store.getState().selectedRowKeys.indexOf(rowIndex) >= 0;
    } else {
      checked = (store.getState().selectedRowKeys.indexOf(rowIndex) >= 0 ||
      defaultSelection.indexOf(rowIndex) >= 0);
    }
    return checked;
  }

  render() {
    const { type, rowIndex, disabled, onChange } = this.props;
    const { checked } = this.state;

    if (type === 'radio') {
      return (
        <Radio
          disabled={disabled}
          onChange={onChange}
          value={rowIndex}
          checked={checked}
        />
      );
    }

    return (
      <Checkbox
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
    );
  }
}
