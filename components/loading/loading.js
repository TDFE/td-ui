/**
 * Created by Session on 17/6/1.
 */

import React, {Component} from 'react';
import s from './style/index';

export default class Loading extends Component {
  static defaultProps = {
    prefixLoad: s.loadingPrefix,
    loading:true
  };

  render() {
    const {prefixLoad, text, size, loading} = this.props;
    let classTmp = prefixLoad + '-container-graph';
    let classNameValue;
    switch (size) {
      case 'small':
        classNameValue = [classTmp, 'loading-small'].join(' ');
        break;
      case 'large':
        classNameValue = [classTmp, 'loading-large'].join(' ');
        break;
      default:
        classNameValue = classTmp;
        break;
    }
    return (
      <div>
        {
          loading ? (
            <div className={prefixLoad}>
              <div className={`${prefixLoad}-container`}>
                <div className={classNameValue}>
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                </div>
                <div className={`${prefixLoad}-container-text`}>
                  {text}
                </div>
              </div>
            </div>
          ) : ''
        }
        <div className={`${prefixLoad}-content`}>
          {
            React.Children.map(this.props.children, child => (<div>{child} </div>))
          }
        </div>
      </div>
    );
  }
}
