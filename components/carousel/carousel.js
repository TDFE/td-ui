import React from 'react'
import PropTypes from 'prop-types'
import Dots from './indicator-dots';
import Buttons from './indicator-buttons';
const styles = {
  wrapper: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    position: 'relative'
  },
  frame: {
    width: '100%',
    height: '100%',
    position: 'absolute'
  }
}

class Carousel extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      frames: [].concat(props.frames || props.children || []),
      current: 0
    }

    this.mounted = false
    this.onTouchStart = this.onTouchStart.bind(this)
    this.onTouchMove = this.onTouchMove.bind(this)
    this.onTouchEnd = this.onTouchEnd.bind(this)
    this.autoSlide = this.autoSlide.bind(this)
    this.prev = this.prev.bind(this)
    this.next = this.next.bind(this)

    if (props.auto) {
      if (props.loop === false) {
        console.warn('Auto-slide only works in loop mode.')
      } else {
        setTimeout(() => this.prepareAutoSlide(), props.duration)
      }
    }
  }

  componentDidMount () {
    this.prepareAutoSlide()
    for (let i = 1; i < this.state.frames.length; i++) {
      this.refs['f' + i].style.opacity = 0
    }
    this.mounted = true
  }

  componentWillUnmount () {
    this.clearAutoTimeout()
    this.mounted = false
  }

  onTouchStart (e) {
    if (this.state.total < 2) return

    this.clearAutoTimeout()
    this.updateFrameSize()
    this.prepareSiblingFrames()

    const { pageX, pageY } = (e.touches && e.touches[0]) || e
    this.setState({
      startX: pageX,
      startY: pageY,
      deltaX: 0,
      deltaY: 0
    })

    this.refs.wrapper.addEventListener('touchmove', this.onTouchMove, {passive: true})
    this.refs.wrapper.addEventListener('mousemove', this.onTouchMove, {passive: true})
    this.refs.wrapper.addEventListener('touchend', this.onTouchEnd, true)
    this.refs.wrapper.addEventListener('mouseup', this.onTouchEnd, true)
  }

  onTouchMove (e) {
    if (e.touches && e.touches.length > 1) return
    this.clearAutoTimeout()

    const { pageX, pageY } = (e.touches && e.touches[0]) || e
    let deltaX = pageX - this.state.startX
    let deltaY = pageY - this.state.startY
    this.setState({
      deltaX: deltaX,
      deltaY: deltaY
    })

    // when reach frames edge in non-loop mode, reduce drag effect.
    if (!this.props.loop) {
      if (this.state.current === this.state.frames.length - 1) {
        deltaX < 0 && (deltaX /= 3)
        deltaY < 0 && (deltaY /= 3)
      }
      if (this.state.current === 0) {
        deltaX > 0 && (deltaX /= 3)
        deltaY > 0 && (deltaY /= 3)
      }
    }

    this.moveFramesBy(deltaX, deltaY)
  }

  onTouchEnd () {
    const direction = this.decideEndPosition()
    direction && this.transitFramesTowards(direction)

    // 清理事件
    this.refs.wrapper.removeEventListener('touchmove', this.onTouchMove)
    this.refs.wrapper.removeEventListener('mousemove', this.onTouchMove)
    this.refs.wrapper.removeEventListener('touchend', this.onTouchEnd, true)
    this.refs.wrapper.removeEventListener('mouseup', this.onTouchEnd, true)

    setTimeout(() => this.prepareAutoSlide(), this.props.duration)
  }

  decideEndPosition () {
    const { deltaX = 0, deltaY = 0, current, frames } = this.state
    const { axis, loop, minMove } = this.props

    switch (axis) {
      case 'x':
        if (loop === false) {
          if (current === 0 && deltaX > 0) return 'origin'
          if (current === frames.length - 1 && deltaX < 0) return 'origin'
        }
        if (Math.abs(deltaX) < minMove) return 'origin'
        return deltaX > 0 ? 'right' : 'left'
      case 'y':
        if (loop === false) {
          if (current === 0 && deltaY > 0) return 'origin'
          if (current === frames.length - 1 && deltaY < 0) return 'origin'
        }
        if (Math.abs(deltaY) < minMove) return 'origin'
        return deltaY > 0 ? 'down' : 'up'
      default:
    }
  }

  moveFramesBy (deltaX, deltaY) {
    const { prev, current, next } = this.state.movingFrames
    const { frameWidth, frameHeight } = this.state

    switch (this.props.axis) {
      case 'x':
        translateXY(current, deltaX, 0)
        if (deltaX < 0) {
          translateXY(next, deltaX + frameWidth, 0)
        } else {
          translateXY(prev, deltaX - frameWidth, 0)
        }
        break
      case 'y':
        translateXY(current, 0, deltaY)
        if (deltaY < 0) {
          translateXY(next, 0, deltaY + frameHeight)
        } else {
          translateXY(prev, 0, deltaY - frameHeight)
        }
        break
      default:
    }
  }

  prepareAutoSlide () {
    if (this.state.frames.length < 2) return

    this.clearAutoTimeout()
    this.updateFrameSize(() => {
      this.prepareSiblingFrames()
    })

    if (this.props.loop && this.props.auto && this.mounted) {
      // 自动滑动只在循环模式下进行
      const slideTimeoutID = setTimeout(this.autoSlide, this.props.interval)
      this.setState({ slider: slideTimeoutID })
    }
  }

  // 自动滚动 'next' 或者 'prev'
  autoSlide (rel) {
    this.clearAutoTimeout()

    switch (rel) {
      case 'prev':
        this.transitFramesTowards(this.props.axis === 'x' ? 'right' : 'down')
        break
      case 'next':
      default:
        this.transitFramesTowards(this.props.axis === 'x' ? 'left' : 'up')
    }

    // 在动画之结束后准备下一次滚动
    setTimeout(() => this.prepareAutoSlide(), this.props.duration)
  }

  next () {
    const { current, frames } = this.state
    if (!this.props.loop && current === frames.length - 1) return false
    this.autoSlide('next')
  }

  prev () {
    if (!this.props.loop && this.state.current === 0) return false
    this.autoSlide('prev')
  }

  clearAutoTimeout () {
    clearTimeout(this.state.slider)
  }

  updateFrameSize (cb) {
    const { width, height } = window.getComputedStyle(this.refs.wrapper)
    this.setState({
      frameWidth: parseFloat(width.split('px')[0]),
      frameHeight: parseFloat(height.split('px')[0])
    }, cb)
  }

  prepareSiblingFrames () {
    const siblings = {
      current: this.refs['f' + this.getFrameId()],
      prev: this.refs['f' + this.getFrameId('prev')],
      next: this.refs['f' + this.getFrameId('next')]
    }

    if (!this.props.loop) {
      this.state.current === 0 && (siblings.prev = undefined)
      this.state.current === this.state.frames.length - 1 && (siblings.next = undefined)
    }

    this.setState({ movingFrames: siblings })

    // 准备上一张下一张的位置
    translateXY(siblings.current, 0, 0)
    if (this.props.axis === 'x') {
      translateXY(siblings.prev, -this.state.frameWidth, 0)
      translateXY(siblings.next, this.state.frameWidth, 0)
    } else {
      translateXY(siblings.prev, 0, -this.state.frameHeight)
      translateXY(siblings.next, 0, this.state.frameHeight)
    }

    return siblings
  }

  getFrameId (pos) {
    const { frames, current } = this.state
    const total = frames.length
    switch (pos) {
      case 'prev':
        return (current - 1 + total) % total
      case 'next':
        return (current + 1) % total
      default:
        return current
    }
  }

  transitFramesTowards (direction) {
    const { prev, current, next } = this.state.movingFrames
    const { duration, axis } = this.props

    let newCurrentId = this.state.current
    switch (direction) {
      case 'up':
        translateXY(current, 0, -this.state.frameHeight, duration)
        translateXY(next, 0, 0, duration)
        newCurrentId = this.getFrameId('next')
        break
      case 'down':
        translateXY(current, 0, this.state.frameHeight, duration)
        translateXY(prev, 0, 0, duration)
        newCurrentId = this.getFrameId('prev')
        break
      case 'left':
        translateXY(current, -this.state.frameWidth, 0, duration)
        translateXY(next, 0, 0, duration)
        newCurrentId = this.getFrameId('next')
        break
      case 'right':
        translateXY(current, this.state.frameWidth, 0, duration)
        translateXY(prev, 0, 0, duration)
        newCurrentId = this.getFrameId('prev')
        break
      default:
        translateXY(current, 0, 0, duration)
        if (axis === 'x') {
          translateXY(prev, -this.state.frameWidth, 0, duration)
          translateXY(next, this.state.frameWidth, 0, duration)
        } else if (axis === 'y') {
          translateXY(prev, 0, -this.state.frameHeight, duration)
          translateXY(next, 0, this.state.frameHeight, duration)
        }
    }

    this.setState({ current: newCurrentId })
  }

  dotsClick (index) {
    const currentId = this.getFrameId();
    const { duration, axis } = this.props
    if (currentId === index) return
    const movingInFrame = this.refs['f' + index]
    const current = this.refs['f' + currentId]
    if (axis === 'x') {
      translateXY(movingInFrame, currentId > index ? -this.state.frameWidth : this.state.frameWidth, 0, 0)
      setTimeout(() => {  // 解决不能重置上一张与下一张位置的问题
        translateXY(current, currentId > index ? this.state.frameWidth : -this.state.frameWidth, 0, duration)
        translateXY(movingInFrame, 0, 0, duration)
      }, 20);
    } else if (axis === 'y') {
      translateXY(movingInFrame, 0, currentId > index ? -this.state.frameHeight : this.state.frameHeight, 0)
      setTimeout(() => {  // 解决不能重置上一张与下一张位置的问题
        translateXY(current, 0, currentId > index ? this.state.frameHeight : -this.state.frameHeight, duration)
        translateXY(movingInFrame, 0, 0, duration)
      }, 20);
    }
    this.setState({ current: index })
  }
  render () {
    const { frames, current } = this.state
    const { prevAndNext, axis, loop, auto, interval } = this.props

    return (
      <div
        ref='wrapper'
        style={objectAssign(styles.wrapper, this.props.style)}
        onTouchStart={this.onTouchStart}
        onMouseDown={this.onTouchStart} >
        {
          frames.map((frame, i) => {
            const frameStyle = objectAssign({zIndex: 99 - i}, styles.frame)
            return <div ref={'f' + i} key={i} style={frameStyle}>{frame}</div>
          })
        }
        <Dots
          index={current}
          total={frames.length}
          onClick={this.dotsClick.bind(this)}
          axis={axis} loop={loop} auto={auto} interval={interval} />
        {
          prevAndNext && <Buttons
                            index={current}
                            total={frames.length}
                            prevHandler={this.prev}
                            nextHandler={this.next}
                            axis={axis} loop={loop} auto={auto} interval={interval} />
        }
        { this.props.frames && this.props.children }
      </div>
    )
  }
}

Carousel.propTypes = {
  axis: PropTypes.oneOf(['x', 'y']),
  auto: PropTypes.bool,
  loop: PropTypes.bool,
  prevAndNext: PropTypes.bool,
  interval: PropTypes.number,
  duration: PropTypes.number,
  widgets: PropTypes.arrayOf(PropTypes.func),
  frames: PropTypes.arrayOf(PropTypes.element),
  style: PropTypes.object,
  minMove: PropTypes.number
}

Carousel.defaultProps = {
  axis: 'x',
  auto: false,
  loop: false,
  interval: 5000,
  duration: 300,
  minMove: 42
}

function translateXY (el, x, y, duration = 0) {
  if (!el) return

  el.style.opacity = '1'

  // animation
  el.style.transitionDuration = duration + 'ms'
  el.style.webkitTransitionDuration = duration + 'ms'

  el.style.transfrom = `translate(${x}px, ${y}px)`
  el.style.webkitTransform = `translate(${x}px, ${y}px) translateZ(0)`
}

function objectAssign (target) {
  var output = Object(target)
  for (var index = 1; index < arguments.length; index++) {
    var source = arguments[index]
    if (source !== undefined && source !== null) {
      for (var nextKey in source) {
        if (source.hasOwnProperty(nextKey)) {
          output[nextKey] = source[nextKey]
        }
      }
    }
  }
  return output
}

export default Carousel
