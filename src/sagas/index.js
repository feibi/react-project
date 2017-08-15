import {
  take,
  put,
  call,
  fork,
  select,
  takeEvery,
  all
} from "redux-saga/effects";
import { watchIncrementAsync } from "./test";

export default function* root() {
  yield fork(watchIncrementAsync);
}
