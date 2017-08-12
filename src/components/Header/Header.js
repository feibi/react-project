import React, { Component } from "react";
import Headroom from "headroom.js";
import style from "./index.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.headroom = null;
  }
  componentDidMount() {
    const myElement = this.refs.header;
    this.headroom = new Headroom(myElement, {
      tolerance: 5,
      offset: 205,
      classes: {
        initial: "animated",
        pinned: "slideDown",
        unpinned: "slideUp"
      }
    });
    this.headroom.init();
  }

  componentWillUnmount() {
    this.headroom.destroy();
  }

  render() {
    return (
      <header ref="header" className="headroom">
        <div className="header-wrapper">sdfasdasd</div>
      </header>
    );
  }
}

export default Header;
