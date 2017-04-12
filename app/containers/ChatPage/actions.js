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

export function loadMessageList(list) {
  return {
    type: LOAD_MESSAGE_LIST,
    payload: {
      list,
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

export function sendChatMessage(touid, content, summary) {
  return {
    type: SEND_CHAT_MESSAGE,
    payload: {
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
  }
}
