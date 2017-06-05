/**
 * @Author: ginalu <ljq>
 * @Date:   2017-05-24 15:04:30
 * @Last modified by:   ljq
 * @Last modified time: 2017-06-01 15:04:33
 */
/* eslint-disable */
import React, {Component,cloneElement} from 'react';
import PropTypes from 'prop-types';
import cn from 'classNames';
import RcInputNumber from 'rc-input-number';
import s from './style';
export default class InputNumber extends Component{
	 static defaultProps = {
	 	prefixCls:s.inputNumberPrefix,
	 	step:1,
	 };
	render(){
		const {className,size,...others} = this.props;
		const InputNumberClass = cn({
			[`${this.props.prefixCls}-lg`]:size ==='large',
			[`${this.props.prefixCls}-sm`]:size ==='small',
		},className);
	return <RcInputNumber className={InputNumberClass} {...others} />;
	}
}