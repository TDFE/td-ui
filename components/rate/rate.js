/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import s from './style';

const prefixCls = s.ratePrefix;

const Rate = props => {
  const { className, style, status, score } = props;
  const addon = status.toLowerCase();
  const classnames = cn(prefixCls, className, `${prefixCls}-${addon}`);
  const st = Object.assign({}, style);
  return (
    <div className={classnames} style={st}>
      <span className={`${prefixCls}-score`}>{score}</span>
      <span className={`${prefixCls}-status`}>{status}</span>
    </div>
  )
}
Rate.PropTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  score: PropTypes.number,
  status: PropTypes.string
}
Rate.defaultProps = {
  score: 0,
  status: 'ACCEPT'
}

export default Rate;
