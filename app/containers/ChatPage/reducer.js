/*
 *
 * ChatPage reducer
 *
 */

import { fromJS } from 'immutable';
import im from 'utils/im';
import {
  DEFAULT_ACTION,
  CHANGE_TAB,
  LOAD_MESSAGE_USERS,
  LOAD_MESSAGE_LIST,
  LOAD_MESSAGE_LIST_NEXTKEY,
  LOAD_TOUCH_USER,
  LOAD_CHAT_MESSAGE,
  LOAD_CLEAR_MESSAGE_CONTENT,
  LOAD_MESSAGE_GROUPS,
  LOAD_GROUP_MESSAGE_LIST,
  LOAD_GROUP_MESSAGE_LIST_NEXTKEY,
  LOAD_TOUCH_GROUP,
  LOAD_CHAT_GROUP_MESSAGE,
  LOAD_GROUP_LIST,
} from './constants';

const initialState = fromJS({
  chatTab: 'message',
  chatMassageUsers: false,
  chatMessageList: false,
  chatMessageNextkey: '',
  chatTouchUser: false,
  clearChatContent: false,
  chatMessageGroups: false,
  chatGroupMessageList: false,
  chatGroupMessageNextkey: '',
  chatTouchGroup: false,
  chatGroupList: false,
});

function chatPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case CHANGE_TAB: {
      const { tab } = action.payload;

      return state.set('chatTab', tab);
    }
    case LOAD_MESSAGE_USERS: {
      const { list } = action.payload;

      return state.set('chatMassageUsers', list);
    }
    case LOAD_MESSAGE_LIST: {
      const { list, nextkey } = action.payload;
      const oldList = state.get('chatMessageList');
      let newList = list.reverse();
      if (nextkey !== '') {
        newList = [...newList, ...oldList];
      }

      return state.set('chatMessageList', newList);
    }
    case LOAD_MESSAGE_LIST_NEXTKEY: {
      const { nextkey } = action.payload;

      return state.set('chatMessageNextkey', nextkey);
    }
    case LOAD_CHAT_MESSAGE: {
      const { data } = action.payload;
      const chatTouchUser = state.get('chatTouchUser');
      const list = state.get('chatMessageList');
      let newList = list;

      if (chatTouchUser && ((chatTouchUser.im_account === data.from || chatTouchUser.im_account === data.to) ||
          (chatTouchUser.im_account === im.getNick(data.from) || chatTouchUser.im_account === im.getNick(data.to)))
        ) {
        newList = [...list, data];
      }

      return state.set('chatMessageList', newList);
    }
    case LOAD_TOUCH_USER: {
      const { data } = action.payload;

      return state.set('chatTouchUser', data);
    }
    case LOAD_CLEAR_MESSAGE_CONTENT: {
      const { doClear } = action.payload;

      return state.set('clearChatContent', doClear);
    }
    case LOAD_MESSAGE_GROUPS: {
      const { list } = action.payload;

      return state.set('chatMessageGroups', list);
    }
    case LOAD_GROUP_MESSAGE_LIST: {
      const { list, nextkey } = action.payload;
      const oldList = state.get('chatGroupMessageList');
      let newList = list.reverse();
      if (nextkey !== '') {
        newList = [...newList, ...oldList];
      }

      return state.set('chatGroupMessageList', newList);
    }
    case LOAD_GROUP_MESSAGE_LIST_NEXTKEY: {
      const { nextkey } = action.payload;

      return state.set('chatGroupMessageNextkey', nextkey);
    }
    case LOAD_TOUCH_GROUP: {
      const { data } = action.payload;

      return state.set('chatTouchGroup', data);
    }
    case LOAD_CHAT_GROUP_MESSAGE: {
      const { data } = action.payload;
      const chatTouchGroup = state.get('chatTouchGroup');
      const list = state.get('chatGroupMessageList');
      let newList = list;

      if (chatTouchGroup && ((chatTouchGroup.tid === data.tid))) {
        newList = [...list, data];
      }

      return state.set('chatGroupMessageList', newList);
    }
    case LOAD_GROUP_LIST: {
      const { list } = action.payload;

      return state.set('chatGroupList', list);
    }
    default:
      return state;
  }
}

export default chatPageReducer;
