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
 import omit from 'lodash/omit';
 import assign from 'object-assign';
 import s from './style';
 // import mixin from './mixin';


 export default class InputNumber extends Component{
 	static defaultProps={
 		prefixCls:s.inputNumberPrefix,
 		type:'text',
 		placeholder:'请输入',
 		btnType:'vertical',
 	};
 	static propTypes={
 		prefixCls:PropTypes.string,
 		disabled:PropTypes.bool,
 		size:PropTypes.oneOf(['small','default','large']),
 		btnType:PropTypes.oneOf(['vertical','crosswise']),
 		max:PropTypes.number,
 		min:PropTypes.number,
 		step:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
 		className:PropTypes.string,
 		focused:PropTypes.bool,
 		defaultValue:PropTypes.any,
 		value:PropTypes.any,
 		onFocus:PropTypes.func,
 		onBlur:PropTypes.func,
 	};
 	constructor(props) {
 		super(props);
 		this.state = {
 			value: props.defaultValue,
 			focused:props.focused,
 			inputValue:props.defaultValue
 		};
 	}
 	onFocus() {
 		this.setState({focused:true});
 		this.refs.input.focus();
 	}
 	onChange(e){
 		this.setState({inputValue:e.target.value});
 	}
 	onBlur(e,...args){
 		this.setState({focused:false});
		const val=Number(e.target.value);
		if(!isNaN(val)&&val!==null&&val>=this.props.min&&val<=this.props.max){
			this.setState({inputValue:e.target.value,value:e.target.value});
		}else{
			this.setState({inputValue:this.state.value})
		}
 	}
 	upfunc(){
 		var inputval=parseFloat(this.state.inputValue);
		const mult=this.formateStep(this.props.step);
 			if(this.props.step){
	 		this.setState({inputValue:(inputval*mult+this.props.step*mult)/mult,value:(inputval*mult+this.props.step*mult)/mult});
	 		}else{
	 		this.setState({inputValue:(inputval+1),value:(inputval+1)});
	 		}
 	}
 	downfunc(){
 		var inputval=Number(this.state.inputValue);
		const mult=this.formateStep(this.props.step);
 			if(this.props.step){
	 		this.setState({inputValue:(inputval*mult-this.props.step*mult)/mult,value:(inputval*mult-this.props.step*mult)/mult});
	 		}else{
	 		this.setState({inputValue:(inputval-1),value:(inputval-1)});
	 		}
 	}
 	formateStep(num){
 		if(Math.floor(num) === num){
 			return 1;
 		}else{
	        var strfi  = num + '';
	        var dotPos = strfi.indexOf('.')
	        var len    = strfi.substr(dotPos+1).length
	        var times  = Math.pow(10, len)
	        return times;
 		}

 	}
 	formatWrapper(num){
 		if (this.props.formatter) {
	      return this.props.formatter(num);
	    }
	    return num;
 	}
 	renderInput(){
 		const props=assign({},this.props);
 		const otherProps=omit(this.props,['prefixCls']);
 		const prefixCls = props.prefixCls;
 		if(!props.type){
 			return props.children;
 		}
 		const editable = !props.readOnly && !props.disabled;
		if('value' in props){
			otherProps.value = props.value;
			delete otherProps.defaultValue;
		}
		let inputDisplayValue;
		if (this.state.focused) {
			inputDisplayValue = this.state.inputValue;
		} else {
			inputDisplayValue = this.state.value;
		}

		if (inputDisplayValue === undefined || inputDisplayValue === null) {
			inputDisplayValue = '';
		}
		const inputDisplayValueFormat=this.formatWrapper(inputDisplayValue);
		return (<input {...otherProps} 
			className={`${prefixCls}-input`} 
			ref="input"
			onFocus={this.onFocus.bind(this)}
			onBlur={this.onBlur.bind(this)}
			  value={inputDisplayValueFormat}
			onChange={this.onChange.bind(this)}
			/>
			);
	}
	renderInputNumber(children){
		const props=this.props;
		const {prefixCls,disabled,focused} = props;
		const classes=cn({
			[prefixCls]: true,
			[props.className]: !!props.className,
			[`${prefixCls}-disabled`]: disabled,
			[`${prefixCls}-focused`]: focused,
			[`${prefixCls}-sm`]: props.size === "small",
			[`${prefixCls}-lg`]: props.size === "large",
		});
		const btnclasses=cn({
			[`${prefixCls}-handler-wrap`]: props.btnType === "vertical",
			[`${prefixCls}-handler-wrap-cw`]: props.btnType === "crosswise",
		});
		let upDisabledClass='',downDisabledClass='';
		const { value } = this.state;
		if (value) {
			if (!isNaN(value)) {
				const val = Number(value);
				if (val >= props.max||(val+props.step)>props.max) {
					upDisabledClass = `${prefixCls}-handler-up-disabled`;
				}
				if (val <= props.min||(val-props.step)<props.min) {
					downDisabledClass = `${prefixCls}-handler-down-disabled`;
				}
			} else {
				upDisabledClass = `${prefixCls}-handler-up-disabled`;
				downDisabledClass = `${prefixCls}-handler-down-disabled`;
			}
		}
		const isUpDisabled=!!upDisabledClass || disabled ;
		const isDownDisabled=!!downDisabledClass || disabled ;
	    //控制点击事件
	    const editable = !props.readOnly && !props.disabled;
	    return (<div className={classes} style={props.style}>
	    	<div className={`${btnclasses}`}>
	    	<button 
	    	disabled={isUpDisabled}
	    	className={`${prefixCls}-handler ${prefixCls}-handler-up ${upDisabledClass}`}
	    	onClick={(editable && !upDisabledClass) ?this.upfunc.bind(this):''}
	    	>+</button>
	    	<button
	    	disabled={isDownDisabled}
	    	className={`${prefixCls}-handler ${prefixCls}-handler-down ${downDisabledClass}`}
	    	onClick={(editable && !downDisabledClass) ?this.downfunc.bind(this):''}
	    	>-</button>
	    	</div>
	    	{children}
	    	</div>);
	}
	render(){
		return this.renderInputNumber(this.renderInput());
	}
}