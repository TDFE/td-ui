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
 import s from './style';
 export default class InputNumber extends Component{
 	static defaultProps={
 		prefixCls:s.inputNumberPrefix,
 	};
 	static propTypes={
 		prefixCls:PropTypes.string,
 		disabled:PropTypes.bool,
 		size:PropTypes.oneOf(['small','default','large']),
 		max:PropTypes.number,
 		min:PropTypes.number,
 		step:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
 		className:PropTypes.string,
 		focused:PropTypes.bool,
 	};
 	formatWrapper(){

 	}
 	render(){
 		const props=this.props;
 		const {prefixCls,disabled}=props;
 		const inputNumberClass = cn({
 			[`${prefixCls}-sm`]: props.size === "small",
 			[`${prefixCls}-lg`]: props.size === "large",
 		});
 		const classes =cn({
 			[`${prefixCls}-disabled`]: disabled,
 			// [`${prefixCls}-focused`]: this.state.focused,
 		});
 		let upDisabledClass='',downDisabledClass = '';
 		let value=this.refs.input.value||props.defaultValue;
 		console.log(value);

 		if(value){
 			if(!isNaN(value)){
 				const val=Number(value);
 				if(val>=props.max){
 					upDisabledClass=`${prefixCls}-hanlder-up-disabled`;
 				}
 				if(val<=props.min){
 					downDisabledClass=`${prefixCls}-hanlder-down-disabled`;
 				}
 			}else{
 				upDisabledClass=`${prefixCls}-hanlder-up-disabled`;
 				downDisabledClass=`${prefixCls}-hanlder-down-disabled`;
 			}
 		}

 		//
 		let inputDisplayValue='';
 		if(this.state.focused){
 			inputDisplayValue = this.state.inputValue;
 		}else{
 			inputDisplayValue = this.toPrecisionAsStep(this.state.value);
 		}
 		if (inputDisplayValue === undefined || inputDisplayValue === null) {
 			inputDisplayValue = '';
 		}

    const inputDisplayValueFormat = this.formatWrapper(inputDisplayValue);
    const isDownDisabled = !!downDisabledClass || disabled ;
    const isUpDisabled = !!upDisabledClass || disabled ;

    return(
    	<div 
    	className={`${inputNumberClass} ${classes}` }
    	style={props.style}
    	>
	    	<div className={`${prefixCls}-handler-wrap`}>
		    	<span></span>
		    	<span></span>
	    	</div>
	    	<div 
    	    className={`${prefixCls}-input-wrap`}
	        role="spinbutton"
	    	aria-valuemin={props.min}
            aria-valuemax={props.max}
            aria-valuenow={value}
	    	>
		    	<input 
		    	className={`${prefixCls}-input`}
		    	type={props.type}
		    	placeholder={props.placeholder}
		    	autoComplete="off"
		    	maxLength={props.maxLength}
		    	disabled={props.disabled}
		    	max={props.max}
		    	min={props.min}
		    	name={props.name}
		    	id={props.id}
		    	onChange={this.onChange}
		    	ref='input'
		    	value={inputDisplayValueFormat}
		    	/>
	    	</div>
    	</div>);
 	}
 }