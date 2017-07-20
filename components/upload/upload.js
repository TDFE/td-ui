import React from 'react';
import Icon from '../icon';
import PropTypes from 'prop-types';
import s from './style';
import message from '../message';
const prefixCls = s.uploadPrefix;
function toArray(value) {
  let newValue = value;
  if (!value) {
    newValue = [];
  } else if (!Array.isArray(value)) {
    newValue = [value];
  }
  return newValue;
}

function noop() {}
class Upload extends React.Component {
  static defaultProps = {
    prefixCls,
    accept: '',
    onChange: noop,
    multiple: false,
    fileList: '',
    note: ''
  }
  static PropTypes = {
    accept: PropTypes.oneOf([PropTypes.string, PropTypes.Array]),
    fileList: PropTypes.oneOf([PropTypes.string, PropTypes.Array]),
    onChange: PropTypes.func,
    note: PropTypes.string
  }
  constructor(props) {
    super(props);
    let fileList = toArray(props.fileList);
    let accept = toArray(props.accept);
    this.state = {
      fileList,
      accept
    }
  }
  componentWillReceiveProps(nextProps) {
    if ('fileList' in this.props) {
      this.setState({
        fileList: toArray(nextProps.fileList)
      })
    }
  }
  handleFileChange = e => {
    const target = e.target;
    const value = target.value;
    const { multiple } = this.props;
    let { accept, fileList } = this.state;
    if (value) {
      const filePath = value.slice(0, value.lastIndexOf('\\'));
      const file = Array.prototype.slice.call(target.files)[0];
      if ('accept' in this.props) {
        for (let i = 0; i < accept.length; i++) {
          if (!(file.name.endsWith(accept[i]))) {
            message.warning('文件格式错误');
            return;
          }
        }
      }
      file.path = `${filePath}${'\\'}${file.name}`;
      if (multiple) {
        fileList.push(file);
      } else {
        fileList = [file];
      }
      if (!(fileList in this.props)) {
        this.setState({
          fileList
        })
      }
      this.props.onChange(multiple ? fileList : fileList[0]);
    }
  }
  handleClick = index => {
    let { fileList } = this.state;
    const { multiple } = this.props;
    fileList.splice(index, 1);
    if (!multiple) {
      fileList = '';
    }
    if (!('fileList' in this.props)) {
      this.setState({fileList});
    }
    this.props.onChange(fileList);
  }
  render() {
    const { prefixCls, note } = this.props;
    const { fileList } = this.state;
    return (
      <div className={`${prefixCls}-file`}>
        <div className={`${prefixCls}-file-select`}>
          <input type='file' name='file' value='' className={`${prefixCls}-file-btn`} onChange={this.handleFileChange}/>
          <div className={`${prefixCls}-file-click`}>
            <Icon className='tdicon-upload upload' type='upload'/>
            选择文件
          </div>
        </div>
        <div className={`${prefixCls}-file-note`}>{note}</div>
        {
          fileList.length ? <div className={`${prefixCls}-file-list`}>
            {
              fileList.map((file, index) => <div className={`${prefixCls}-file-single`} key={index}>
                <Icon className='tdicon-copy copy' type='copy'/>
                {file.path}
                <Icon type='cross' className='close' onClick={() => this.handleClick(index)}/>
              </div>)
            }
          </div> : null
        }
      </div>
    )
  }
}

export default Upload;
