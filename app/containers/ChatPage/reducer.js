/*
 *
 * ChatPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  CHANGE_TAB,
  LOAD_MESSAGE_USERS,
  LOAD_MESSAGE_LIST,
  LOAD_MESSAGE_LIST_NEXTKEY,
  LOAD_TOUCH_USER,
  LOAD_CHAT_MESSAGE,
} from './constants';

const initialState = fromJS({
  chatTab: 'message',
  chatMassageUsers: false,
  chatMessageList: false,
  chatMessageNextkey: '',
  chatTouchUser: false,
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
      const { list } = action.payload;

      return state.set('chatMessageList', list);
    }
    case LOAD_MESSAGE_LIST_NEXTKEY: {
      const { nextkey } = action.payload;

      return state.set('chatMessageNextkey', nextkey);
    }
    case LOAD_CHAT_MESSAGE: {
      const { data } = action.payload;
console.log('msg data', data);
      return state;
    }
    case LOAD_TOUCH_USER: {
      const { data } = action.payload;

      return state.set('chatTouchUser', data);
    }
    default:
      return state;
  }
}

export default chatPageReducer;
