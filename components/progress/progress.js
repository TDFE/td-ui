/**
 * @Author: Yingxi.Hao <yzf>
 * @Date:   2017-06-20
 * @Last modified by:   hyx
 * @Last modified time: 2017-06-23
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import s from './style';
import Icon from '../icon';
export default class Progress extends Component {
  static propTypes = {
    // 目的是引入最开始的类名，比如td-progress,需要去default.less配置去
    prefixCls: PropTypes.string,
    // 哪种类型
    type: PropTypes.oneOf(['line', 'stripe', 'circle']),
    // 是否有动画
    active: PropTypes.bool,
    // 自定义宽度,line,stripe:width,circle:width,height
    width: PropTypes.number,
    // 百分比
    percent: PropTypes.number,
    // 普通的class
    className: PropTypes.string,
    // success,exception,active,normal(可不传)
    status: PropTypes.oneOf(['success', 'exception', 'active'])
  };
  static defaultProps = {
    prefixCls: s.progressPrefix,
    type: 'line',
    percent: 0
  };
  render () {
    const {prefixCls, type, status, width, percent, className, ...restProps} = this.props;
    let progressStatus = parseInt(percent.toString(), 10) >= 100 && !(status in this.props) ? 'success' : (status || 'normal');
    let progressInfo;
    let progress;
    let text;
    let currentWidth = width || 280;
    switch (progressStatus) {
      case 'success':
        text = <Icon type="check-circle" className={`${prefixCls}-icon`}></Icon>;
        if (type === 'circle') {
          text = <Icon type="check" className={`${prefixCls}-circle-icon`}></Icon>;
        }
        break;
      case 'exception':
        text = <Icon type="cross-circle" className={`${prefixCls}-icon`}></Icon>
        if (type === 'circle') {
          text = <Icon type="cross" className={`${prefixCls}-circle-icon`}></Icon>
        }
        break;
      default:
        text = `${percent}%`;
    }
    progressInfo = <span className={`${prefixCls}-text`}>{text}</span>;
    if (type === 'line') {
      const lineOuterStyle = {
        width: currentWidth,
        height: 8
      };
      const lineStyle = {
        width: `${percent}%`,
        height: 8
      };
      progress = (
        <div className={`${prefixCls}-wrapper`}>
          <div className={`${prefixCls}-outer`} style={lineOuterStyle}>
            <div className={`${prefixCls}-inner`} style={lineStyle}>
            </div>
          </div>
          {progressInfo}
        </div>
    );
    } else if (type === 'stripe') {
      const stripeOuterStyle = {
        width: currentWidth,
        height: 14
      };
      const stripeStyle = {
        width: `${percent}%`,
        height: 14
      };
      progress = (
        <div className={`${prefixCls}-wrapper`}>
        <div className={`${prefixCls}-outer`} style={stripeOuterStyle}>
          <div className={`${prefixCls}-inner-stripe`} style={stripeStyle}>
          </div>
        </div>
          {progressInfo}
        </div>
      );
    } else if (type === 'circle') {
      const circleSize = width || 120;
      const rotateDeg = (18 / 5) * percent;
      let outerCircleStyle = {
        width: circleSize,
        height: circleSize
      };
      let innerCircleStyle = {
        width: circleSize,
        height: circleSize
      };
      let percentCircleStyle = {
        width: circleSize,
        height: circleSize
      };
      let leftCircleStyle = {
        width: circleSize,
        height: circleSize,
        transform: `rotate(${rotateDeg}deg)`
      };
      let rightCircleStyle = {
        width: circleSize,
        height: circleSize
      };
      if (percent > 50) {
        rightCircleStyle = {
          width: circleSize,
          height: circleSize,
          display: 'block'
        };
        percentCircleStyle = Object.assign(percentCircleStyle, {
          clip: 'rect(auto,auto,auto,auto)'
        });
      }
      progress = (
        <div className={`${prefixCls}-wrapper`}>
        <div className={`${prefixCls}-circle-outer`} style={outerCircleStyle}>
          <div className={`${prefixCls}-circle-inner`} style={innerCircleStyle}>
            <div className={`${prefixCls}-circle-percent`} style={percentCircleStyle}>
            <div className={`${prefixCls}-circle-left`} style={leftCircleStyle}></div>
            <div className={`${prefixCls}-circle-right`} style={rightCircleStyle}></div>
            </div>
          </div>
          <div className={`${prefixCls}-circle-text`}>{text}</div>
        </div>
        </div>
      );
    }
    const classString = ClassNames(prefixCls, {
      [`${prefixCls}-${type}`]: true,
      [`${prefixCls}-status-${progressStatus}`]: true
    }, className);
    return (
      <div {...restProps} className={classString}>
        {progress}
      </div>
    )
  }
}
