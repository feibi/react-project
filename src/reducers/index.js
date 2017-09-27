import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { count } from './test';
const rootReducer = combineReducers({ router: routerReducer, count });

export default rootReducer;
