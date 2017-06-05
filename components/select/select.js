/**
 * Created by Session on 17/5/31.
 */
/* eslint-disable */
import React, {Component} from 'react';

export default class Select extends Component {
    render() {
        let kids = React.Children.map(children, child =>addOption(child));
        return (
            <select>
                <option value="2">4</option>
            </select>
        );
    }
}