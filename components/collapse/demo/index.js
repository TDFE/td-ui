/* eslint-disable */
import '../style/index.less';
import Collapse, { Panel } from '../index';
import React from 'react';
import ReactDOM from 'react-dom';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

function random() {
  return parseInt(Math.random() * 10, 10) + 1;
}

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    ['onChange', 'setActivityKey', 'reRender', 'toggle'].map(fn => this[fn] = this[fn].bind(this));
  }

  getInitialState() {
    return {
      time: random(),
      accordion: false,
      activeKey: ['4'],
    };
  }

  onChange(activeKey) {
    this.setState({
      activeKey,
    });
  }

  getItems() {
    const items = [];
    for (let i = 0, len = 3; i < len; i++) {
      const key = i + 1;
      items.push(
        <Panel header={`This is panel header ${key}`} key={key} >
          <p>{text.repeat(this.state.time)}</p>
        </Panel>
      );
    }
    items.push(
      <Panel header={`This is panel header 4`} key="4">
        <Collapse defaultActiveKey="1">
          <Panel header={`This is panel nest panel`} key="1">
            <p>{text}</p>
          </Panel>
        </Collapse>
      </Panel>
    );

    return items;
  }

  setActivityKey() {
    this.setState({
      activeKey: ['2'],
    });
  }

  reRender() {
    this.setState({
      time: random(),
    });
  }

  toggle() {
    this.setState({
      accordion: !this.state.accordion,
    });
  }

  render() {
    const accordion = this.state.accordion;
    const btn = accordion ? 'accordion' : 'collapse';
    const activeKey = this.state.activeKey;
    return (<div style={{ margin: 20, width: 400 }}>
      <button onClick={this.reRender}>reRender</button>
      <button onClick={this.toggle}>{btn}</button>
      <br/><br/>
      <button onClick={this.setActivityKey}>active header 2</button>
      <br/><br/>
      <Collapse
        accordion={accordion}
        onChange={this.onChange}
        activeKey={activeKey}
      >
        {this.getItems()}
      </Collapse>
    </div>);
  }
}
const MOUNT_NODE = document.getElementById('app');

let render = ()=>{
  ReactDOM.render(<Test/>, MOUNT_NODE);
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
