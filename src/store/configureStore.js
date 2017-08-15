import {createStore, applyMiddleware, compose} from 'redux'
import createSagaMiddleware from 'redux-saga';
import {routerMiddleware} from 'react-router-redux';
import rootReducer from '../reducers';
import sagas from '../sagas'

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(history) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const router = routerMiddleware(history)

  let middleware = [router, sagaMiddleware];
  let enhancer = applyMiddleware(...middleware);

  if (typeof __DEVTOOLS__ !== 'undefined' && __DEVTOOLS__) {
    enhancer = composeEnhancers(applyMiddleware(...middleware));
  }

  const store = createStore(rootReducer, enhancer);
  sagaMiddleware.run(sagas);
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }
  store.runSaga = sagaMiddleware.run
  return store
}
