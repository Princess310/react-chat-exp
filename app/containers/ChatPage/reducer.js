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
  LOAD_MESSAGE_USER,
  LOAD_MESSAGE_LIST,
  LOAD_MESSAGE_LIST_NEXTKEY,
  LOAD_TOUCH_USER,
  LOAD_CHAT_MESSAGE,
  LOAD_CLEAR_MESSAGE_CONTENT,
  LOAD_MESSAGE_GROUPS,
  LOAD_MESSAGE_GROUP,
  LOAD_GROUP_MESSAGE_LIST,
  LOAD_GROUP_MESSAGE_LIST_NEXTKEY,
  LOAD_TOUCH_GROUP,
  LOAD_CHAT_GROUP_MESSAGE,
  LOAD_GROUP_LIST,
  LOAD_USER_CONTACTS,
  LOAD_USER_CONTACT,
  LOAD_USER_GROUPS,
  LOAD_USER_GROUP,
  LOAD_SEARCH_FILTER,
  LOAD_LOADING_STATUS,
} from './constants';

const initialState = fromJS({
  chatTab: 'message',
  loadingMessageUsers: false,
  chatMassageUsers: false,

  loadingMessageList: false,
  chatMessageList: false,
  chatMessageNextkey: '',

  loadingTouchUser: false,
  chatTouchUser: false,
  clearChatContent: false,

  loadingMessageGroups: false,
  chatMessageGroups: false,

  loadingGroupMessageList: false,
  chatGroupMessageList: false,
  chatGroupMessageNextkey: '',

  loadingTouchGroup: false,
  chatTouchGroup: false,

  loadingGroupList: false,
  chatGroupList: false,

  loadingUserContacts: false,
  chatUserContacts: false,

  chatUserContact: false,

  loadingUserGroups: false,
  chatUserGroups: false,

  chatUserGroup: false,
  chatSearchFilter: '',
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

      return state.set('chatMassageUsers', list).set('loadingMessageUsers', false);
    }
    case LOAD_MESSAGE_USER: {
      const { data } = action.payload;
      const oldList = state.get('chatMassageUsers');
      let resultList = [];
      let storeUser = {};

      const newList = oldList ? oldList.filter((user) => {
        if (data.id === user.id) {
          storeUser = user;
        }

        return data.id !== user.id;
      }) : [];

      if (storeUser.id) {
        resultList = [storeUser, ...newList];
      } else {
        data.avator = data.avatar;
        data.msg = {
          header: {
            summary: '',
          },
          customize: '{}',
        };
        resultList = [data, ...newList];
      }

      return state.set('chatMassageUsers', resultList);
    }
    case LOAD_MESSAGE_LIST: {
      const { list, nextkey } = action.payload;
      const oldList = state.get('chatMessageList');
      let newList = list.reverse();
      if (nextkey !== '') {
        newList = [...newList, ...oldList];
      }

      return state.set('chatMessageList', newList).set('loadingMessageList', false);
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

      return state.set('chatTouchUser', data).set('loadingTouchUser', false);
    }
    case LOAD_CLEAR_MESSAGE_CONTENT: {
      const { doClear } = action.payload;

      return state.set('clearChatContent', doClear);
    }
    case LOAD_MESSAGE_GROUPS: {
      const { list } = action.payload;

      return state.set('chatMessageGroups', list).set('loadingMessageGroups', false);
    }
    case LOAD_MESSAGE_GROUP: {
      const { data } = action.payload;
      const oldList = state.get('chatMessageGroups');
      let resultList = [];
      let storeGroup = {};

      const newList = oldList ? oldList.filter((group) => {
        if (data.id === group.id) {
          storeGroup = group;
        }

        return data.id !== group.id;
      }) : [];

      if (storeGroup.id) {
        resultList = [storeGroup, ...newList];
      } else {
        data.tid = data.im_group_id;
        resultList = [data, ...newList];
      }

      return state.set('chatMessageGroups', resultList);
    }
    case LOAD_GROUP_MESSAGE_LIST: {
      const { list, nextkey } = action.payload;
      const oldList = state.get('chatGroupMessageList');
      let newList = list.reverse();
      if (nextkey !== '') {
        newList = [...newList, ...oldList];
      }

      return state.set('chatGroupMessageList', newList).set('loadingGroupMessageList', false);
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

      return state.set('chatGroupList', list).set('loadingGroupList', false);
    }
    case LOAD_USER_CONTACTS: {
      const { list } = action.payload;

      return state.set('chatUserContacts', list).set('loadingUserContacts', false);
    }
    case LOAD_USER_CONTACT: {
      const { data } = action.payload;

      return state.set('chatUserContact', data);
    }
    case LOAD_USER_GROUPS: {
      const { list } = action.payload;

      return state.set('chatUserGroups', list);
    }
    case LOAD_USER_GROUP: {
      const { data } = action.payload;

      return state.set('chatUserGroup', data);
    }
    case LOAD_SEARCH_FILTER: {
      const { value } = action.payload;

      return state.set('chatSearchFilter', value);
    }
    case LOAD_LOADING_STATUS: {
      const { type, bool } = action.payload;

      switch (type) {
        case 'messageUsers':
          return state.set('loadingMessageUsers', bool);
        case 'messageList':
          return state.set('loadingMessageList', bool);
        case 'messageGroups':
          return state.set('loadingMessageGroups', bool);
        case 'gruopMessageList':
          return state.set('loadingGroupMessageList', bool);
        case 'userContacts':
          return state.set('loadingUserContacts', bool);
        case 'userGruops':
          return state.set('loadingUserGroups', bool);
        case 'groupList':
          return state.set('loadingGroupList', bool);
        case 'touchUser':
          return state.set('loadingTouchUser', bool);
        default:
          return state;
      }
    }
    default:
      return state;
  }
}

export default chatPageReducer;
