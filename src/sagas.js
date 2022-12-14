/** @format */

import { call, put, all, takeEvery } from 'redux-saga/effects';
import {
  GET_POST_FETCH,
  GET_USERS_FETCH,
  GET_USERS_SUCCESS,
  GET_POST_SUCCESS,
} from './actions';

const usersFetch = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users').then(
    (res) => {
      return res.json();
    },
  );
  return res;
};

const postFetch = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts').then(
    (res) => {
      return res.json();
    },
  );
  return res;
};

function* workGetPostFetch() {
  const posts = yield call(postFetch);
  yield put({ type: GET_POST_SUCCESS, posts });
}
function* workGetUserFetch() {
  const users = yield call(usersFetch);
  yield put({ type: GET_USERS_SUCCESS, users });
}

function* mySaga() {
  yield all([
    yield takeEvery(GET_USERS_FETCH, workGetUserFetch),
    yield takeEvery(GET_POST_FETCH, workGetPostFetch),
  ]);
}

export default mySaga;
