import { take, put, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { hashHistory } from 'react-router';

import { loadUser } from 'containers/App/actions';
import request from 'utils/request';
import im from 'utils/im';
import { DO_LOGIN, DO_WECHAT_LOGIN } from './constants';

export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
}

export function* doWechatLogin(action) {
  try {
    const { code } = action.payload;
    const res = yield request.doPost('user/third-login', {
      type: 1,
      webWeChat: 1,
      code,
    });

    localStorage.setItem('access_token', res.access_token);
    yield im.login(res.data.chat.userid, res.data.chat.password);
    yield put(loadUser(res.data));

    hashHistory.replace('/chat');
  } catch (err) {
    // console.log(err);
  }
}

export function* loginSaga() {
  const watcherWechat = yield takeLatest(DO_WECHAT_LOGIN, doWechatLogin);

  yield take(LOCATION_CHANGE);
  yield cancel(watcherWechat);
}

// All sagas to be loaded
export default [
  defaultSaga,
  loginSaga,
];
