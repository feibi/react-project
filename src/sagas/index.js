import {
  fork
  // take,
  // put,
  // call,
  // select,
  // takeEvery,
  // all
} from 'redux-saga/effects';
import { watchIncrementAsync } from './test';

export default function* root() {
  yield fork(watchIncrementAsync);
}
