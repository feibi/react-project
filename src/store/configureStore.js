import {createStore, applyMiddleware, compose} from 'redux'
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers/';
import { testSaga } from '../sagas'
const sagaMiddleware = createSagaMiddleware();

export default function configureStore(history) {
    let store;
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const router = routerMiddleware(history)
    if (typeof __DEVTOOLS__ !== 'undefined' && __DEVTOOLS__) {
        // 创建一个中间件集合
        const middleware = [sagaMiddleware]; //, loggerMiddleware
        store = composeEnhancers(applyMiddleware(...middleware))(createStore);
    } else {
        store = compose(applyMiddleware(sagaMiddleware))(createStore);
    }

    return store(rootReducer)
}
