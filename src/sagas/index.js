import {
  take,
  put,
  call,
  fork,
  select,
  takeEvery,
  all
} from 'redux-saga/effects'
import testSaga from './test'

export default function * root() {
  yield all([fork(testSaga)])
}
