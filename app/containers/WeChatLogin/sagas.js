import { put, takeLatest } from 'redux-saga/effects';
import { hashHistory } from 'react-router';

import { loadUser } from 'containers/App/actions';
import request from 'utils/request';
import im from 'utils/im';
import { DO_WECHAT_LOGIN } from './constants';

export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
}

export function* doWechatLogin(action) {
  try {
    const { code } = action.payload;
    const res = yield request.doPost('user/third-login', {
      type: 1,
      pc: 1,
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
  yield takeLatest(DO_WECHAT_LOGIN, doWechatLogin);
}

// All sagas to be loaded
export default [
  defaultSaga,
  loginSaga,
];
