/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import s from './style';
import Options from './options';
import Pager from './pager';
import QuickJumper from './jumper';

const prefixCls = s.paginationPrefix;
function noop() {

}
class Pagination extends Component {
  static defaultProps = {
    defaultCurrent: 1,
    total: 0,
    defaultPageSize: 10,
    showSizeChanger: false,
    onChange: noop,
    onShowSizeChange: noop,
    showNum: 5,
    size: '',
    showQuickJumper: false,
    simple: false,
    pageSizeOptions: ['10', '20', '30', '40'],
    prefixCls
  }
  static PropTypes = {
    showNum: PropTypes.oneOf([3, 5, 7]),
    size: PropTypes.string,
    defaultCurrent: PropTypes.number,
    total: PropTypes.number,
    onChange: PropTypes.func,
    defaultPageSize: PropTypes.number,
    showSizeChanger: PropTypes.bool,
    showTotal: PropTypes.func,
    current: PropTypes.number,
    pageSize: PropTypes.number,
    showQuickJumper: PropTypes.bool,
    simple: PropTypes.bool,
    pageSizeOptions: PropTypes.arrayOf(PropTypes.string),
    onShowSizeChange: PropTypes.func
  }
  constructor(props) {
    super(props);
    let current;
    if ('current' in props) {
      current = props.current;
    } else {
      current = props.defaultCurrent;
    }
    let pageSize;
    if ('pageSize' in props) {
      pageSize = props.pageSize;
    } else {
      pageSize = props.defaultPageSize;
    }
    this.state = {
      current,
      pageSize
    };
  }
  componentWillReceiveProps(nextProps) {
    if ('current' in nextProps) {
      this.setState({
        current: nextProps.current
      })
    }
    if ('pageSize' in nextProps) {
      const current = this.state.current;
      const allPages = this._calcAllPages(nextProps.pageSize);
      const newCurrent = current > allPages ? allPages : current;
      this.setState({
        pageSize: nextProps.pageSize,
        current: newCurrent
      })
    }
  }
  _calcAllPages = (pageSize = this.state.pageSize) => {
    const total = this.props.total;
    return parseInt(total / pageSize) + (total % pageSize ? 1 : 0);
  }
  _hasPrev = () => {
    const current = this.state.current;
    return current > 1;
  }
  _hasNext = () => {
    const current = this.state.current;
    const allPages = this._calcAllPages();
    return current < allPages;
  }
  _isValid = page => {
    const current = this.state.current;
    return current !== page;
  }
  onClick = page => {
    const { pageSize } = this.state;
    if (this._isValid(page)) {
      if (!('current' in this.props)) {
        this.setState({
          current: page
        })
      }
      this.props.onChange(page, pageSize);
    }
  }
  jumpPrev = () => {
    const { showNum } = this.props;
    const { current } = this.state;
    const newCurrent = Math.max(1, current - showNum);
    this.onClick(newCurrent);
  }
  jumpNext = () => {
    const { showNum } = this.props;
    const { current } = this.state;
    const allPages = this._calcAllPages();
    const newCurrent = Math.min(allPages, current + showNum);
    this.onClick(newCurrent);
  }
  prev = () => {
    const { current } = this.state;
    if (this._hasPrev()) {
      this.onClick(current - 1);
    }
  }
  next = () => {
    const { current } = this.state;
    if (this._hasNext()) {
      this.onClick(current + 1);
    }
  }
  showTotal = () => {
    const { showTotal, total } = this.props;
    const { current, pageSize } = this.state;
    const allPages = this._calcAllPages();
    const range = [];
    range[0] = pageSize * (current - 1) + 1;
    range[1] = current !== allPages ? current * pageSize : total;
    if (showTotal) {
      return showTotal(total, range);
    }
  }
  onShowSizeChange = pageSize => {
    const { current } = this.state;
    const { total, onShowSizeChange } = this.props;
    const allPages = this._calcAllPages(pageSize);
    const newCurrent = (current - 1) * pageSize > total ? allPages : current;
    if (!('pageSize' in this.props)) {
      this.setState({pageSize})
    }
    if (!('current' in this.props)) {
      this.setState({
        current: newCurrent
      })
    }
    onShowSizeChange(newCurrent, pageSize);
  }
  render() {
    const pageList = [];
    const { style, className, total, showSizeChanger, showNum, size, showTotal, showQuickJumper, simple, pageSizeOptions, prefixCls } = this.props;
    const { current, pageSize } = this.state;
    const allPages = this._calcAllPages();
    const classnames = cn(prefixCls, className, {
      [`${prefixCls}-mini`]: size === 'small',
      [`${prefixCls}-simple`]: simple
    });
    const st = Object.assign({}, style);
    const pageBufferSize = parseInt(showNum / 2);
    const prev = (
      <div key='prev' className={cn(`${prefixCls}-prev`, {[`${prefixCls}-disabled`]: current === 1})} onClick={this.prev}>
        <a href='javascript:void(0);'></a>
      </div>
    )
    const next = (
      <div key='next' className={cn(`${prefixCls}-next`, {[`${prefixCls}-disabled`]: current === allPages})} onClick={this.next}>
        <a href='javascript:void(0);'></a>
      </div>
    )
    /*
    if (simple) {
      return (
        <div className={classnames} style={st}>
          {prev}
          <div className={`${prefixCls}-simple-pager`}>
            <input value={current} type='text'/>
            /
            {total}
          </div>
          {next}
        </div>
      )
    } */
    if (allPages <= showNum + pageBufferSize) {
      for (let i = 1; i <= allPages; i++) {
        pageList.push(
          <Pager key={i} active={i === current} prefixCls={prefixCls} page={i} onClick={() => this.onClick(i)}/>
        )
      }
    } else {
      const firstPager = (
        <Pager key={1} prefixCls={prefixCls} page={1} onClick={() => this.onClick(1)}/>
      );
      const lastPager = (
        <Pager key={allPages} prefixCls={prefixCls} page={allPages} onClick={() => this.onClick(allPages)}/>
      );
      const jumpPrev = (
        <div key='jumpPrev' className={`${prefixCls}-jump-prev`} onClick={this.jumpPrev}>
          <a href='javascript:void(0);'></a>
        </div>
      );
      const jumpNext = (
        <div key='jumpNext' className={`${prefixCls}-jump-next`} onClick={this.jumpNext}>
          <a href='javascript:void(0);'></a>
        </div>
      )

      let left = Math.max(1, current - pageBufferSize);
      let right = Math.min(allPages, current + pageBufferSize);
      if (current <= showNum - pageBufferSize) {
        right = showNum;
      }
      if (current >= allPages - pageBufferSize) {
        left = allPages - showNum;
      }
      for (let i = left; i <= right; i++) {
        pageList.push(
          <Pager key={i} active={i === current} prefixCls={prefixCls} page={i} onClick={() => this.onClick(i)}/>
        )
      }
      if (left >= 3) {
        pageList.unshift(jumpPrev);
        pageList.unshift(firstPager);
      } else if (left <= showNum - 1 && left > 1) {
        pageList.unshift(firstPager);
      }
      if (right <= allPages - 2) {
        pageList.push(jumpNext);
        pageList.push(lastPager);
      } else if (right >= allPages - (showNum - pageBufferSize) && right < allPages) {
        pageList.push(lastPager);
      }
    }
    pageList.unshift(prev);
    pageList.push(next);
    return (
      <div className={classnames} style={st}>
        {
          showTotal ? <div className={`${prefixCls}-total-text`}>
                        {this.showTotal()}
                      </div> : ''
        }
        {pageList}
        {
          showSizeChanger ? <Options prefixCls={`${prefixCls}-options`} pageSizeOptions={pageSizeOptions} pageSize={pageSize} onShowSizeChange={this.onShowSizeChange}/> : ''
        }
        {
          showQuickJumper ? <QuickJumper prefixCls={`${prefixCls}-quick-jumper`} current={current}
          allPages={allPages} onChange={page => this.onClick(page)} current={current}/> : ''
        }

      </div>
    )
  }
}

export default Pagination;
