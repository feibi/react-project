import { put, call, takeEvery, takeLatest } from "redux-saga/effects";
import { increment } from "../actions";

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export function* incrementAsync(action) {
  yield call(delay, 1000);
  yield put(increment(action.payload));
}

export function* watchIncrementAsync() {
  yield takeLatest("INCREMENT_ASYNC", incrementAsync);
}
