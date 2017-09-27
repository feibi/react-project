import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Headroom from 'headroom.js';
import './index.css';

class Header extends Component {
  static propTypes = {
    children: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.headroom = null;
  }

  componentDidMount() {
    const myElement = this.header;
    this.headroom = new Headroom(myElement, {
      tolerance: 5,
      offset: 205,
      classes: {
        initial: 'animated',
        pinned: 'slideDown',
        unpinned: 'slideUp'
      }
    });
    this.headroom.init();
  }

  componentWillUnmount() {
    this.headroom.destroy();
  }

  render() {
    return (
      <header ref={ref => (this.header = ref)} className="headroom">
        <div className="header-wrapper">{this.props.children}</div>
      </header>
    );
  }
}

export default Header;
