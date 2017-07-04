/**
 * Created by wxy on 2017/6/29.
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';
import s from './style/index';

const prefixCls = s.sliderPrefix;

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: props.x || 0,
      y: props.y || 0
    }
  }

  static defaultProps = {
    axis: 'x',
    xmin: 0,
    ymin: 0,
    className: prefixCls,
    toFixed: 0,
    sliderWidth: 300,
    sliderHeight: 300
  }

  render() {
    const { axis, disabled, showValue, sliderWidth, sliderHeight } = this.props;
    let pos = this.getPosition();
    let valueStyle = {};
    if (axis === 'x') valueStyle.width = pos.left;
    if (axis === 'y') valueStyle.height = pos.top;

    let sliderStyle = {}
    if (axis === 'x') sliderStyle.width = sliderWidth;
    if (axis === 'y') sliderStyle.height = sliderHeight;

    const className = cn(prefixCls, {
      [`${prefixCls}-${axis}`]: true,
      [this.props.className]: true,
      [`${prefixCls}-disabled`]: disabled
    });

    return (
      <div className={ className } style={ sliderStyle } onClick={ this.handleClick }>
        {
          showValue ? <div className="show-value">{ this.state[axis] }</div> : ''
        }
        <div
          className="value"
          style={ valueStyle }>
        </div>
        <div
          className="handle"
          ref="handle"
          onMouseDown={ !disabled ? this.handleMouseDown : null }
          onClick={function (e) {
            e.stopPropagation();
          }}
          style={ pos }>
        </div>
      </div>
    )
  }

  getClientPosition(e) {
    e.preventDefault();

    return {
      x: e.clientX,
      y: e.clientY
    };
  }

  getPosition() {
    let top = (this.state.y - this.props.ymin) / (this.props.ymax - this.props.ymin) * 100;
    let left = (this.state.x - this.props.xmin) / (this.props.xmax - this.props.xmin) * 100;

    if (top > 100) top = 100;
    if (top < 0) top = 0;
    if (this.props.axis === 'x') top = 0;
    top += '%';

    if (left > 100) left = 100;
    if (left < 0) left = 0;
    if (this.props.axis === 'y') left = 0;
    left += '%';

    return { top: top, left: left };
  }

  change(pos, dragEnd) {
    const rect = ReactDOM.findDOMNode(this).getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    let left = pos.left;
    let top = pos.top;
    const { axis, toFixed, onChange } = this.props;

    if (left < 0) left = 0;
    if (left > width) left = width;
    if (top < 0) top = 0;
    if (top > height) top = height;

    let x = 0;
    let y = 0;
    if (axis === 'x') {
      x = (left / width * (this.props.xmax - this.props.xmin) + this.props.xmin).toFixed(toFixed);
    }
    if (axis === 'y') {
      y = (top / height * (this.props.ymax - this.props.ymin) + this.props.ymin).toFixed(toFixed);
    }
    this.setState({ x: x, y: y });

    if (onChange) onChange({ axis: axis, value: this.state[axis] })
  }

  handleMouseDown = (e) => {
    e.preventDefault();
    const dom = this.refs.handle;
    const clientPos = this.getClientPosition(e);

    this.start = {
      x: dom.offsetLeft,
      y: dom.offsetTop
    };

    this.offset = {
      x: clientPos.x,
      y: clientPos.y
    };

    document.addEventListener('mousemove', this.handleDrag);
    document.addEventListener('mouseup', this.handleDragEnd);
  }

  getPos(e) {
    const clientPos = this.getClientPosition(e);
    const posX = clientPos.x + this.start.x - this.offset.x;
    const posY = clientPos.y + this.start.y - this.offset.y;

    return { left: posX, top: posY };
  }

  handleDrag = (e) => {
    e.preventDefault();
    this.change(this.getPos(e));
  }

  handleDragEnd = (e) => {
    e.preventDefault();
    document.removeEventListener('mousemove', this.handleDrag);
    document.removeEventListener('mouseup', this.handleDragEnd);
  }

  handleClick = (e) => {
    const clientPos = this.getClientPosition(e);
    const rect = ReactDOM.findDOMNode(this).getBoundingClientRect();

    this.change({
      left: (clientPos.x - rect.left),
      top: (clientPos.y - rect.top)
    }, true);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({
        [`${nextProps.axis}`]: [`${nextProps.value}`]
      })
    }
  }
}

export default Slider;
