import React from 'react'
import ReactDOM from 'react-dom';
import 'react-hot-loader/patch';
import {Provider} from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import qhistory from 'qhistory'
import {stringify, parse} from 'qs'
import {Router} from 'react-router'
import {AppContainer} from 'react-hot-loader';
import configureStore from './store/configureStore'
import App from './app'

const browserHistory = createHistory();
const history = qhistory(browserHistory, stringify, parse);
const store = configureStore(history); // 路由的store*/

const render = Component => {
  ReactDOM.render((
    <AppContainer>
      <Provider store={store}>
        <Router history={history}>
          <Component/>
        </Router>
      </Provider>
    </AppContainer>
  ), document.getElementById('root'));
}

render(App);

if (module.hot) {
  module.hot.accept('./app', () => {
    const NextApp = require('./app').default;
    render(NextApp)
  });
}
