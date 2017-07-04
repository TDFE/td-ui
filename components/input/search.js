/**
 * @Author:  GinaLu <ljq>
 * @Date:   2017-05-16 14:49:49
 * @Last modified by:   ljq
 * @Last modified time: 2017-05-16 18:33:09
 */

import React, {Component,cloneElement} from 'react';
import cn from 'classnames';
import Input from './input';
import Icon from '../icon';
import s from './style';
export default class Search extends Component{
	render(){
		const classes=cn({

		});
		const searchSuffix = (<Icon type="search" onClick={this.onSearch}/>);
		return (<Input
					className={classes}
					suffix={searchSuffix}
					ref={node => this.input = node}
				/>);
	}
	// static defaultProps = {
	// 	prefixCls = s.inputPrefix +'-search',
	//     onSearch() {},
	// };
	// onSearch = () => {
	//     const { onSearch } = this.props;
	//     if (onSearch) {
	//       onSearch(this.input.refs.input.value);
	//     }
	//     this.input.refs.input.focus();
	//   }
	// render(){
	// 	const { className, prefixCls, ...others } = this.props;
	// 	const searchSuffix = (
	// 		<Icon
	// 		className={`${prefixCls}-icon`}
	// 		onClick={this.onSearch}
	// 		type="search"
	// 		/>
	// 		);
	// 	return (
	// 		<Input
	// 		{...otherProps}
	// 		suffix={searchSuffix}
	// 		className={classes}
	// 		ref={node => this.input = node}
	// 		/>
	// 		);
	// }
}
