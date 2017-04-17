/*
 *
 * ChatPage actions
 *
 */

import {
  DEFAULT_ACTION,
  FETCH_USER,
  CHANGE_TAB,
  FETCH_MESSAGE_USERS,
  LOAD_MESSAGE_USERS,
  FETCH_MESSAGE_LIST,
  LOAD_MESSAGE_LIST,
  LOAD_MESSAGE_LIST_NEXTKEY,
  FETCH_TOUCH_USER,
  LOAD_TOUCH_USER,
  SEND_CHAT_MESSAGE,
  LOAD_CHAT_MESSAGE,
  LOAD_CLEAR_MESSAGE_CONTENT,
  DO_AGREE_EXCHANGE_TEL,
  DO_DISAGREE_EXCHANGE_TEL,
  DO_AGREE_INTERVIEW,
  DO_DISAGREE_INTERVIEW,
  FETCH_MESSAGE_GROUPS,
  LOAD_MESSAGE_GROUPS,
  FETCH_GROUP_MESSAGE_LIST,
  LOAD_GROUP_MESSAGE_LIST,
  LOAD_GROUP_MESSAGE_LIST_NEXTKEY,
  LOAD_TOUCH_GROUP,
  SEND_CHAT_GROUP_MESSAGE,
  LOAD_CHAT_GROUP_MESSAGE,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function fetchUser() {
  return {
    type: FETCH_USER,
  };
}

export function chageTab(tab) {
  return {
    type: CHANGE_TAB,
    payload: {
      tab,
    },
  };
}

export function fetchMessageUsers() {
  return {
    type: FETCH_MESSAGE_USERS,
  };
}

export function loadMessageUsers(list) {
  return {
    type: LOAD_MESSAGE_USERS,
    payload: {
      list,
    },
  };
}

export function fetchMessageList(touid, nextkey, count) {
  return {
    type: FETCH_MESSAGE_LIST,
    payload: {
      touid,
      nextkey,
      count,
    },
  };
}

export function loadMessageList(list, nextkey) {
  return {
    type: LOAD_MESSAGE_LIST,
    payload: {
      list,
      nextkey,
    },
  };
}

export function loadMessageListNextkey(nextkey) {
  return {
    type: LOAD_MESSAGE_LIST_NEXTKEY,
    payload: {
      nextkey,
    },
  };
}

export function fetchTouchUser(id) {
  return {
    type: FETCH_TOUCH_USER,
    payload: {
      to_uid: id,
    },
  };
}

export function loadTouchUser(data) {
  return {
    type: LOAD_TOUCH_USER,
    payload: {
      data,
    },
  };
}

export function sendChatMessage(userid, touid, content, summary) {
  return {
    type: SEND_CHAT_MESSAGE,
    payload: {
      userid,
      touid,
      content,
      summary,
    },
  };
}

export function loadChatMessage(data) {
  return {
    type: LOAD_CHAT_MESSAGE,
    payload: {
      data,
    },
  };
}

export function clearChatMessage(doClear) {
  return {
    type: LOAD_CLEAR_MESSAGE_CONTENT,
    payload: {
      doClear,
    },
  };
}

export function agreeChangeTel(uid) {
  return {
    type: DO_AGREE_EXCHANGE_TEL,
    payload: {
      to_uid: uid,
    },
  };
}

export function disAgreeChangeTel(uid) {
  return {
    type: DO_DISAGREE_EXCHANGE_TEL,
    payload: {
      to_uid: uid,
    },
  };
}

export function agreeInterview(uid, id) {
  return {
    type: DO_AGREE_INTERVIEW,
    payload: {
      to_uid: uid,
      interview_id: id,
    },
  };
}

export function disAgreeInterview(uid, id) {
  return {
    type: DO_DISAGREE_INTERVIEW,
    payload: {
      to_uid: uid,
      interview_id: id,
    },
  };
}

export function fetchMessageGroups() {
  return {
    type: FETCH_MESSAGE_GROUPS,
  };
}

export function loadMessageGroups(list) {
  return {
    type: LOAD_MESSAGE_GROUPS,
    payload: {
      list: list
    },
  };
}

export function fetchGroupMessageList(tid, nextkey, count) {
  return {
    type: FETCH_GROUP_MESSAGE_LIST,
    payload: {
      tid,
      nextkey,
      count,
    },
  };
}

export function loadGroupMessageList(list, nextkey) {
  return {
    type: LOAD_GROUP_MESSAGE_LIST,
    payload: {
      list,
      nextkey,
    },
  };
}

export function loadGroupMessageListNextkey(nextkey) {
  return {
    type: LOAD_GROUP_MESSAGE_LIST_NEXTKEY,
    payload: {
      nextkey,
    },
  };
}

export function loadTouchGroup(data) {
  return {
    type: LOAD_TOUCH_GROUP,
    payload: {
      data: data,
    },
  };
}

export function sendChatGroupMessage(userid, tid, content, summary) {
  return {
    type: SEND_CHAT_GROUP_MESSAGE,
    payload: {
      userid,
      tid,
      content,
      summary,
    },
  };
}

export function loadChatGroupMessage(data) {
  return {
    type: LOAD_CHAT_GROUP_MESSAGE,
    payload: {
      data,
    },
  };
}
