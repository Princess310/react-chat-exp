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
} from './constants';

const initialState = fromJS({
  chatTab: 'message',
  chatMassageUsers: [],
  chatMessageList: [],
  chatMessageNextkey: '',
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
    default:
      return state;
  }
}

export default chatPageReducer;
