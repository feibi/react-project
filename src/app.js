import React from "react";
import PropTypes from "prop-types";
import "normalize.css";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Routes from "./routes";
import Main from "./test/main";
import style from "./less/base";

const App = ({}) => {
  return (
    <div>
      <Header />
      <div className={style["container"]}>
        <Routes />
      </div>
    </div>
  );
};

App.propTypes = {};

export default App;
