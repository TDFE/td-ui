import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputHandler extends Component{
	render(){
		const{prefixCls,disabled,...otherProps} = this.props;
		return (
			<div disabled={disabled} >
				<span {...otherProps} />
			</div>
			);
	}
}