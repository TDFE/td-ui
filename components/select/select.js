/**
 * Created by Session on 17/5/31.
 */
/* eslint-disable */
import React, {Component} from 'react';

class Option extends Component {
    render() {
        return (
            <div>
                我是Option
            </div>
        );
    }

}

export default class Select extends Component {
    static Option = Option;

    render() {
        return (
            <div>
                <div>
                    <input type="text"/>
                </div>
                <span>^</span>
                <div>
                    <ul>
                        {
                            React.Children.map(this.props.children, (child) => {
                                return (<li>{child}</li> );
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}