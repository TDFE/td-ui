import React from 'react';
import ReactDOM from 'react-dom';

/* eslint-disable no-unused-vars */
import Button from '../../button/index';
/* eslint-disable no-unused-vars */
import Steps from '../index';

const MOUNT_NODE = document.getElementById('app');
const Step = Steps.Step;

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      current2: 0,
      current3: 0
    }
  }

  render() {
    return <div>
      <div className="demo1" style={{width: 1000, margin: 100}}>
        <h1>default</h1>
        <Steps current={this.state.current}>
          <Step title="步骤1" desc="这个是步骤1步骤1步骤1"></Step>
          <Step title="步骤2" desc="这个是步骤2步骤2步骤2"></Step>
          <Step title="步骤2" desc="这个是步骤3步骤3步骤3"></Step>
        </Steps>
        <div style={{marginTop: 20}}>
          <Button style={{marginRight: 10, display: this.state.current < 2 ? 'inline-block' : 'none'}} onClick={() => {
            this.setState({
              current: this.state.current + 1
            })
          }}>下一步</Button>
          <Button style={{marginRight: 10, display: this.state.current > 0 ? 'inline-block' : 'none'}} onClick={() => {
            this.setState({
              current: this.state.current - 1
            })
          }}>上一步</Button>
        </div>
      </div>

      <div className="demo2" style={{width: 1000, margin: 100}}>
        <h1>mini</h1>
        <Steps current={this.state.current2} mode="mini">
          <Step title="步骤1" desc="这个是步骤1步骤1步骤1"></Step>
          <Step title="步骤2" desc="这个是步骤2步骤2步骤2"></Step>
          <Step title="步骤2" desc="这个是步骤3步骤3步骤3"></Step>
        </Steps>
        <div style={{marginTop: 20}}>
          <Button style={{marginRight: 10, display: this.state.current2 < 2 ? 'inline-block' : 'none'}} onClick={() => {
            this.setState({
              current2: this.state.current2 + 1
            })
          }}>下一步</Button>
          <Button style={{marginRight: 10, display: this.state.current2 > 0 ? 'inline-block' : 'none'}} onClick={() => {
            this.setState({
              current2: this.state.current2 - 1
            })
          }}>上一步</Button>
        </div>
      </div>

      <div className="demo3" style={{width: 1000, margin: 100}}>
        <h1>vertical</h1>
        <Steps current={this.state.current3} mode="vertical">
          <Step title="步骤1" desc="这个是步骤1步骤1步骤1"></Step>
          <Step title="步骤2" desc="这个是步骤2步骤2步骤2"></Step>
          <Step title="步骤2" desc="这个是步骤3步骤3步骤3"></Step>
        </Steps>
        <div style={{marginTop: 20}}>
          <Button style={{marginRight: 10, display: this.state.current3 < 2 ? 'inline-block' : 'none'}} onClick={() => {
            this.setState({
              current3: this.state.current3 + 1
            })
          }}>下一步</Button>
          <Button style={{marginRight: 10, display: this.state.current3 > 0 ? 'inline-block' : 'none'}} onClick={() => {
            this.setState({
              current3: this.state.current3 - 1
            })
          }}>上一步</Button>
        </div>
      </div>
    </div>
  }
}

let render = () => {
  ReactDOM.render(<Demo />, MOUNT_NODE);
};

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
