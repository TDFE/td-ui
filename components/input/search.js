/**
 * @Author:  GinaLu <ljq>
 * @Date:   2017-05-16 14:49:49
 * @Last modified by:   ljq
 * @Last modified time: 2017-05-16 18:33:09
 */

import React, { Component } from 'react';
import cn from 'classnames';
import Input from './input';
import Icon from '../icon';

export default class Search extends Component {
  render() {
    const classes = cn({});
    const searchSuffix = (<Icon type="search" onClick={this.onSearch} />);
    return (
      <Input
        className={classes}
        suffix={searchSuffix}
        ref={node => { this.input = node; }}
      />
    );
  }
}
