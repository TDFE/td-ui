import React from 'react'
import ReactDOM from 'react-dom'
import Carousel from '../index'
import './index.less'

const MOUNT_NODE = document.getElementById('app')

class Demo extends React.Component {
  constructor () {
    super()
    this.state = {
      axis: 'x',
      loop: true,
      prevAndNext: true
    }
  }
  setAxis (axis) {
    return () => this.setState({axis: axis})
  }
  setLoop (loop) {
    return () => this.setState({loop: loop})
  }
  setPrevAndNext (prevAndNext) {
    return () => this.setState({prevAndNext: prevAndNext})
  }
  render () {
    return (
      <div style={{height: '100%'}}>
        <header>
          <span className={this.state.axis === 'x' ? 'axis current' : 'axis'}
            onClick={this.setAxis('x')}>水平</span>
          <span className={this.state.axis === 'y' ? 'axis current' : 'axis'}
            onClick={this.setAxis('y')}>垂直</span>
          <span className={this.state.loop ? 'axis current' : 'axis'}
            onClick={this.setLoop(true)}>循环</span>
          <span className={this.state.loop ? 'axis' : 'axis current'}
            onClick={this.setLoop(false)}>不循环</span>
          <span className={this.state.prevAndNext ? 'axis current' : 'axis'}
            onClick={this.setPrevAndNext(true)}>显示上下按钮</span>
          <span className={this.state.prevAndNext ? 'axis' : 'axis current'}
            onClick={this.setPrevAndNext(false)}>不显示上下按钮</span>
        </header>
        <Carousel loop={this.state.loop} auto={false} axis={this.state.axis} prevAndNext={this.state.prevAndNext}>
          <div className="frame" style={{backgroundColor: 'royalblue', height: '100%'}}>跑马灯 1</div>
          <div className="frame" style={{backgroundColor: 'orange', height: '100%'}}>跑马灯 2</div>
          <div className="frame" style={{backgroundColor: 'orchid', height: '100%'}}>跑马灯 3</div>
          <div className="frame" style={{backgroundColor: 'red', height: '100%'}}>跑马灯 4</div>
          <div className="frame" style={{backgroundColor: 'green', height: '100%'}}>跑马灯 5</div>
        </Carousel>
      </div>
    )
  }
}

let render = () => {
  ReactDOM.render(<Demo />, MOUNT_NODE)
}

try {
  render();
} catch (e) {
  console.log(e);
}

if (module.hot) {
  module.hot.accept(['../index'], () => {
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(MOUNT_NODE);
      render();
    });
  });
}
