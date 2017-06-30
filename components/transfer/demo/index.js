import React from 'react';
import ReactDOM from 'react-dom';

/* eslint-disable no-unused-vars */
import Button from '../../button';
/* eslint-disable no-unused-vars */
import Icon from '../../icon';
/* eslint-disable no-unused-vars */
import Transfer from '../index';

const MOUNT_NODE = document.getElementById('app');

const mockData = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
    disabled: i % 3 < 1
  });
}
mockData[2].children = [{
  key: '2-0',
  title: `content2-0`
}, {
  key: '2-1',
  title: `content2-1`
}, {
  key: '2-2',
  title: `content2-2`,
  children: [{
    key: '2-2-0',
    title: `content2-2-0`
  }, {
    key: '2-2-1',
    title: `content2-2-1`
  }]
}]
mockData[4].children = [{
  key: '4-0',
  title: `content4-0`
}, {
  key: '4-1',
  title: `content4-1`
}]

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: mockData,
      value: []
    }
  }

  render() {
    const { dataSource } = this.state;
    return <div>
      <div style={{width: 450, margin: 50}}>
        <Transfer
          dataSource={dataSource}
          titles={['Source', 'Target']}
          value={this.state.value}
          onChange={value => {
            this.setState({
              value
            });
            console.log(value);
          }}
        />
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
