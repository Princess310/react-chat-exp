import { take, cancel, put, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { loadUser } from 'containers/App/actions';
import request from 'utils/request';
import im from 'utils/im';

import { FETCH_USER, FETCH_MESSAGE_USERS, FETCH_MESSAGE_LIST } from './constants';
import { loadMessageUsers, loadMessageList, loadMessageListNextkey } from './actions';

export function* fetchUser() {
  try {
    // Call our request helper (see 'utils/request')
    const res = yield request.doGet('user/info');

    yield put(loadUser(res.data));
    yield im.login(res.data.chat.userid, res.data.chat.password);
    yield fetchMessageUsers();
  } catch (err) {
    // console.log(err);
  }
}

export function* fetchMessageUsers() {
  try {
    const res = yield im.getRecentContact(20);

    const { cnts } = res.data;
    const contactMap = new Map();
    const contactIds = [];
    for (const contact of cnts) {
      const id = im.getNick(contact.uid);

      // check for not sys msg
      if (id !== im.getSysName()) {
        contactMap.set(id, contact);
        contactIds.push(id);
      }
    }

    // fetch users info for app users
    const usersData = yield request.doGet('chat/get-user-info', { user_ids: contactIds.join(',') });
    const usersList = usersData.list;

    for (const user of usersList) {
      const userId = user.im_account;

      contactMap.set(userId, Object.assign(contactMap.get(userId), user));
    }

    // fetch unread msg count
    const countData = yield im.getUnreadMsgCount(20);
    const countList = countData.data;

    for (const count of countList) {
      const userId = im.getNick(count.contact);

      if (contactMap.get(userId)) {
        contactMap.set(userId, Object.assign(contactMap.get(userId), { msgCount: count.msgCount }));
      }
    }

    // get list result
    const resultList = [];
    for (const [, user] of contactMap) {
      resultList.push(user);
    }

    yield put(loadMessageUsers(resultList));
  } catch (err) {
    // console.log(err);
  }
}

export function* fetchMessageList(action) {
  try {
    const { touid, nextkey, count } = action.payload;
    // Call our request helper (see 'utils/request')
    const res = yield im.chat.getHistory(im.getNick(touid), nextkey, count);
    const { msgs, nextKey } = res.data;

    yield put(loadMessageList(msgs));
    yield put(loadMessageListNextkey(nextKey));
  } catch (err) {
    // console.log(err);
  }
}

// Individual exports for testing
export function* defaultSaga() {
  const watcher = yield takeLatest(FETCH_USER, fetchUser);
  const watcherMessageUser = yield takeLatest(FETCH_MESSAGE_USERS, fetchMessageUsers);
  const watcherMessageList = yield takeLatest(FETCH_MESSAGE_LIST, fetchMessageList);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
  yield cancel(watcherMessageUser);
  yield cancel(watcherMessageList);
}

// All sagas to be loaded
export default [
  defaultSaga,
];
