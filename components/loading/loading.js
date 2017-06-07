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
        const {prefixLoad, text, graph, size, loading} = this.props;
        console.log(loading);
        let classTmp = prefixLoad + "-container-graph";
        let classNameValue;
        switch (size) {
            case "small":
                classNameValue = [classTmp, "loading-small"].join(' ');
                break;
            case "large":
                classNameValue = [classTmp, "loading-large"].join(' ');
                break;
            default:
                classNameValue = classTmp;
        }

        return (
            <div>
                {
                    loading ?
                        <div className={prefixLoad}>
                            <div className={`${prefixLoad}-container`}>
                                <div className={classNameValue}>
                                    <div className="loading-1"></div>
                                    <div className="loading-2"></div>
                                    <div className="loading-3"></div>
                                    <div className="loading-4"></div>
                                </div>
                                <div className={`${prefixLoad}-container-text`}>
                                    {text}
                                </div>
                            </div>
                        </div> : ''
                }
                <div className="loading-children">
                    {
                        React.Children.map(this.props.children, child => (<div>我是：{child} </div>))
                    }
                </div>
            </div>
        );
    }
}