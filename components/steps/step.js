import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import s from './style';
import { String } from '../util/is'

export default class Steps extends Component {
  static defaultProps = {
    prefixCls: s.stepsPrefix,
    title: '',
    desc: ''
  }

  static propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    desc: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
  }

  renderHead = () => {
    const { prefixCls, stepNumber, current, icon } = this.props;
    if (icon) {
      return String(icon) ? <span className={`tdicon tdicon-${icon}`}></span> : icon
    }
    return stepNumber >= current ? <span className={`${prefixCls}-step-icon`}>{stepNumber + 1}</span> : <span className={`${prefixCls}-step-icon tdicon tdicon-search`}></span>
  }

  render() {
    const { prefixCls, stepNumber, current, stepLength, title, desc, mode } = this.props;
    let style = {};
    if (mode !== 'vertical') {
      style = {
        width: `${100 / stepLength}%`
      }
    }
    return (<div className={classnames(`${prefixCls}-step`, {
      [`${prefixCls}-step-finished`]: current > stepNumber,
      [`${prefixCls}-step-waiting`]: current < stepNumber,
      [`${prefixCls}-step-progress`]: current === stepNumber
    })} style={style}>
      {
        mode !== 'mini' ? <div className={`${prefixCls}-step-line`}>
          <i></i>
        </div> : ''
      }
      <div className={`${prefixCls}-step-con`}>
        {
          this.renderHead()
        }
        <div className={`${prefixCls}-step-main`}>
          <div className={`${prefixCls}-step-title`}>
            {title}
          </div>
          {
            desc ? <div className={`${prefixCls}-step-desc`}>{desc}</div> : ''
          }
        </div>
      </div>
    </div>)
  }
}
