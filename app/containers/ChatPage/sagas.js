import { put, takeLatest } from 'redux-saga/effects';
import { loadUser } from 'containers/App/actions';
import request from 'utils/request';
import im from 'utils/im';

import {
  FETCH_USER,
  FETCH_MESSAGE_USERS,
  FETCH_MESSAGE_LIST,
  FETCH_TOUCH_USER,
  SEND_CHAT_MESSAGE,
  DO_AGREE_EXCHANGE_TEL,
  DO_DISAGREE_EXCHANGE_TEL,
  DO_AGREE_INTERVIEW,
  DO_DISAGREE_INTERVIEW,
  FETCH_MESSAGE_GROUPS,
  FETCH_GROUP_MESSAGE_LIST,
  SEND_CHAT_GROUP_MESSAGE,
  FETCH_USER_CONTACTS,
  FETCH_USER_GROUPS,
} from './constants';
import {
  loadMessageUsers,
  loadMessageList,
  loadMessageListNextkey,
  loadTouchUser,
  loadChatMessage,
  clearChatMessage,
  loadMessageGroups,
  loadGroupMessageList,
  loadGroupMessageListNextkey,
  loadChatGroupMessage,
  loadGroupList,
  loadUserContacts,
  loadUserGroups,
  loadLoadingStatus,
} from './actions';

export function* fetchUser() {
  try {
    // Call our request helper (see 'utils/request')
    const res = yield request.doGet('user/info');

    yield put(loadUser(res.data));
    yield im.login(res.data.chat.userid, res.data.chat.password);
    yield fetchMessageUsers();
    yield fetchMessageGroups();
    yield fetchUserContacts();
    yield fetchUserGroups();

    // start im listen task
    im.startListenAllMsg();
  } catch (err) {
    // console.log(err);
  }
}

export function* fetchMessageUsers() {
  try {
    yield put(loadLoadingStatus('messageUsers', true));
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
    yield put(loadLoadingStatus('messageList', true));
    const { touid, nextkey, count } = action.payload;
    // Call our request helper (see 'utils/request')
    const res = yield im.chat.getHistory(im.getNick(touid), nextkey, count);
    const { msgs, nextKey } = res.data;

    yield put(loadMessageList(msgs, nextkey));
    yield put(loadMessageListNextkey(nextKey));
  } catch (err) {
    // console.log(err);
  }
}

export function* sendMessage(action) {
  try {
    const { userid, touid, summary, content } = action.payload;
    const res = yield im.chat.sendCustomMsg(touid, JSON.stringify(content), summary);

    if (res.code === im.statusCode.SUCCESS) {
      const newMsg = {
        from: userid,
        to: touid,
        msg: {
          header: {
            summary,
          },
          customize: JSON.stringify(content),
        },
        time: (new Date()).getTime(),
      };

      yield put(loadChatMessage(newMsg));

      // clear the chat message first
      yield put(clearChatMessage(true));
    }

    // reset the store status
    yield put(clearChatMessage(false));

    // then refresh the message users info
    yield fetchMessageUsers();
  } catch (err) {
    // console.log(err);
  }
}

export function* fetchTouchUser(action) {
  try {
    yield put(loadLoadingStatus('touchUser', true));
    const res = yield request.doGet('interview/info', action.payload);

    if (res.code === 200) {
      yield put(clearChatMessage(true));
    }
    const { data: { user } } = res;

    yield fetchMessageList({
      payload: {
        touid: user.im_account,
        nextkey: '',
        count: 10,
      },
    });
    yield put(loadTouchUser(user));
    yield put(clearChatMessage(false));
  } catch (err) {
    // console.log(err);
  }
}

export function* agreeChangeTel(action) {
  try {
    yield request.doPut('interview/disagree-exchange', action.payload);
  } catch (err) {
    // console.log(err);
  }
}

export function* disAgreeChangeTel(action) {
  try {
    yield request.doPut('interview/agree-exchange', action.payload);
  } catch (err) {
    // console.log(err);
  }
}

export function* agreeInterview(action) {
  try {
    yield request.doPut('interview/agree', action.payload);
  } catch (err) {
    // console.log(err);
  }
}

export function* disAgreeInterview(action) {
  try {
    yield request.doPut('interview/refuse', action.payload);
  } catch (err) {
    // console.log(err);
  }
}

export function* fetchMessageGroups() {
  try {
    yield put(loadLoadingStatus('messageGroups', true));
    const res = yield im.tribe.getTribeList();
    const { data } = res;
    const resultList = [];

    // fetch groups infos
    yield put(loadLoadingStatus('groupList', true));
    const groupsList = yield request.doGet('group/lists', { list_type: 4 });
    const { list } = groupsList;
    // store group list info
    yield put(loadGroupList(list));

    // store result list
    for (const t of data) {
      for (const group of list) {
        if (t.tid === +group.im_group_id) {
          resultList.push(Object.assign(t, group));
          break;
        }
      }
    }

    // fetch unread msg count
    const countData = yield im.getUnreadMsgCount(20);
    const countList = countData.data;
    for (const count of countList) {
      const userId = im.getNick(count.contact);

      for (const g of resultList) {
        if ((im.getGroupPreFix() + g.tid) === userId) {
          g.msgCount = count.msgCount;
        }
      }
    }

    yield put(loadMessageGroups(resultList));
  } catch (err) {
    // console.log(err);
  }
}

export function* fetchGroupMessageList(action) {
  try {
    yield put(loadLoadingStatus('gruopMessageList', true));
    const { tid, nextkey, count } = action.payload;
    // Call our request helper (see 'utils/request')
    const res = yield im.tribe.getHistory(tid, nextkey, count);
    const { msgs, nextKey } = res.data;

    yield put(loadGroupMessageList(msgs, nextkey));
    yield put(loadGroupMessageListNextkey(nextKey));
  } catch (err) {
    // console.log(err);
  }
}

export function* sendGroupMessage(action) {
  try {
    const { userid, tid, summary, content } = action.payload;
    const msgInfo = {
      header: {
        summary,
      },
      customize: JSON.stringify(content),
    };
    const res = yield im.tribe.sendMsg(tid, JSON.stringify(msgInfo), summary);

    if (res.code === im.statusCode.SUCCESS) {
      const newMsg = {
        from: userid,
        to: tid,
        tid,
        msg: {
          header: {
            summary,
          },
          customize: JSON.stringify(content),
        },
        time: (new Date()).getTime(),
      };

      yield put(loadChatGroupMessage(newMsg));

      // clear the chat message first
      yield put(clearChatMessage(true));
    }

    // reset the store status
    yield put(clearChatMessage(false));

    // then refresh the message users info
    // yield fetchMessageUsers();
  } catch (err) {
    // console.log(err);
  }
}

export function* fetchUserContacts() {
  try {
    yield put(loadLoadingStatus('userContacts', true));
    const res = yield request.doGet('follow/friend-lists');
    const { list } = res;

    yield put(loadUserContacts(list));
  } catch (err) {
    // console.log(err);
  }
}

export function* fetchUserGroups() {
  try {
    yield put(loadLoadingStatus('userGruops', true));
    const res = yield request.doGet('group/lists');

    const { data: { host, join } } = res;
    const list = [
      {
        name: '我创建和管理的群',
        list: host,
      },
      {
        name: '我加入的群',
        list: join,
      },
    ];

    yield put(loadUserGroups(list));
  } catch (err) {
    // console.log(err);
  }
}

// Individual exports for testing
export function* defaultSaga() {
  yield takeLatest(FETCH_USER, fetchUser);
  yield takeLatest(FETCH_MESSAGE_USERS, fetchMessageUsers);
  yield takeLatest(FETCH_MESSAGE_LIST, fetchMessageList);
  yield takeLatest(FETCH_TOUCH_USER, fetchTouchUser);
  yield takeLatest(SEND_CHAT_MESSAGE, sendMessage);
  yield takeLatest(DO_AGREE_EXCHANGE_TEL, agreeChangeTel);
  yield takeLatest(DO_DISAGREE_EXCHANGE_TEL, disAgreeChangeTel);
  yield takeLatest(DO_AGREE_INTERVIEW, agreeInterview);
  yield takeLatest(DO_DISAGREE_INTERVIEW, disAgreeInterview);
  yield takeLatest(FETCH_MESSAGE_GROUPS, fetchMessageGroups);
  yield takeLatest(FETCH_GROUP_MESSAGE_LIST, fetchGroupMessageList);
  yield takeLatest(SEND_CHAT_GROUP_MESSAGE, sendGroupMessage);
  yield takeLatest(FETCH_USER_CONTACTS, fetchUserContacts);
  yield takeLatest(FETCH_USER_GROUPS, fetchUserGroups);
}

// All sagas to be loaded
export default [
  defaultSaga,
];
