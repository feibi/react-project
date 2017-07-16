import React from 'react';
import PropTypes from 'prop-types';
import {Route, Switch} from 'react-router-dom';
import Routes from './routes';
import Main from './test/main'
const App = ({}) => {
  return (
    <div>
      <Routes/>
    </div>
  );
}

App.propTypes = {};

export default App;
