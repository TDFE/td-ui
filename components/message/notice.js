/**
 * Created by wxy on 2017/6/7.
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Notice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notices: []
    }
  }

  static defaultProps = {
    prefixCls: 'td-notice',
    duration: 2
  }

  static propTypes = {
    prefixCls: PropTypes.string
  }

  addNotice = (notice) => {
    const key = notice.key = notice.key || `td_ui_notice_${Date.now()}`;
    this.setState(previousState => {
      const notices = previousState.notices;
      if (!notices.filter(v => v.key === key).length) {
        return {
          notices: notices.concat(notice)
        }
      }
    })
    const timer = `timer_${Date.now()}`;
    this[timer] = setTimeout(() => {
      this.removeNotice(key);
      clearTimeout(this[timer]);
      this[timer] = null;
    }, this.props.duration * 1000);
  }

  removeNotice = key => {
    this.setState(previousState => {
      return {
        notices: previousState.notices.filter(notice => notice.key !== key)
      }
    })
  }

  render() {
    const { prefixCls } = this.props;
    const animateProps = {};
    if (this.state.notices.length <= 1) {
      animateProps.component = '';
    }
    return (
      <div className={ prefixCls }>
        {
          this.state.notices.map((notice) => {
            return (
              <div className={ `${prefixCls}-notice` } key={ notice.key }>
                <div className={ `${prefixCls}-notice-content` }>
                  { notice.content }
                </div>
              </div>
            );
          })
        }
      </div>
    )
  }
}

Notice.newInstance = function newNoticeInstance(properties) {
  let div = document.createElement('div');
  document.body.appendChild(div);
  const notification = ReactDOM.render(<Notice {...properties} />, div);
  return {
    notice(noticeProps) {
      notification.addNotice(noticeProps);
    }
  };
};

export default Notice;
