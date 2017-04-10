import { take, put, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { browserHistory } from 'react-router';

import { loadUser } from 'containers/App/actions';
import request from 'utils/request';
import im from 'utils/im';

import { DO_LOGIN } from './constants';

export function* doLogin(action) {
  try {
    // Call our request helper (see 'utils/request')
    const res = yield request.doPut('user/login', action.payload);

    localStorage.setItem('access_token', res.access_token);
    yield im.login(res.data.chat.userid, res.data.chat.password);
    yield put(loadUser(res.data));

    browserHistory.push('/chat');
  } catch (err) {
    // console.log(err);
  }
}

// Individual exports for testing
export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
}

export function* loginSaga() {
  const watcher = yield takeLatest(DO_LOGIN, doLogin);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  defaultSaga,
  loginSaga,
];
