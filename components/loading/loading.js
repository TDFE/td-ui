/**
 * Created by Session on 17/6/1.
 */
/* eslint-disable */
import React, {Component} from 'react';
import s from './style/index';

export default class Loading extends Component {
    static defaultProps = {
        prefixLoad: s.loadingPrefix
    };

    render() {
        const {prefixLoad, text} = this.props;
        console.log(this.props);
        return (
            <div >
                <div className={prefixLoad}>
                    {text}
                </div>
                <div className="loading-children">
                    {
                        React.Children.map(this.props.children, child => (<div>我是：{child} </div>))
                    }
                </div>
            </div>
        );
    }
}