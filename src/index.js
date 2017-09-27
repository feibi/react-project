import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import qhistory from 'qhistory';
import { stringify, parse } from 'qs';
import { AppContainer } from 'react-hot-loader';
import configureStore from './store/configureStore';
import App from './app';

const browserHistory = createHistory();
const history = qhistory(browserHistory, stringify, parse);
const store = configureStore(history); // 路由的store*/

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Router history={history}>
          <Component />
        </Router>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./app', () => {
    // eslint-disable-next-line
    const NextApp = require('./app').default;
    render(NextApp);
  });
}
