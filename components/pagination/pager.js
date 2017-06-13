/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Pager = props => {
  const { page, prefixCls, active } = props;
  const classnames = cn(`${prefixCls}-item`, `${prefixCls}-item-${page}`, {
    [`${prefixCls}-item-active`]: active
  });

  return (
    <div className={classnames} onClick={props.onClick}>
      <a href='javascript:void(0);'>{page}</a>
    </div>
  )
}

Pager.PropTypes = {
  page: PropTypes.number,
  active: PropTypes.bool,
  prefixCls: PropTypes.string
}

export default Pager;
