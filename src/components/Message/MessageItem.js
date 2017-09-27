/**
 * Created by zylee on 2017/3/13.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

class MessageItem extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.clearCloseTimer = this.clearCloseTimer.bind(this);
  }

  componentDidMount() {
    let duration = this.props.duration;
    if (duration) {
      this.closeTimer = setTimeout(() => {
        this.close();
      }, duration * 1000);

      console.log(duration, 'duration');
    }
  }
  componentWillUnMount() {
    this.clearCloseTimer();
  }

  clearCloseTimer() {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  }

  close() {
    this.props.onClose();
  }

  render() {
    let { children, prefixCls, closable } = this.props;
    let name = `${prefixCls}-item`;
    let className = classNames({
      [`${name}-content`]: 1,
      [`${name}-content-closable`]: closable
    });
    return (
      <div className={name}>
        <div className={className}>
          {children}
          {closable ? (
            <span onClick={this.close} className={`${name}-close`} />
          ) : null}
        </div>
      </div>
    );
  }
}

MessageItem.propTypes = {
  duration: PropTypes.number,
  onClose: PropTypes.func,
  children: PropTypes.any,
  closable: PropTypes.bool,
  prefixCls: PropTypes.string
};
MessageItem.defaultProps = {
  duration: 1.5
};

export default MessageItem;
