/*
 *
 * LoginPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  LOAD_LOGIN_ERROR,
} from './constants';

const initialState = fromJS({
  error: false,
  errorMsg: '',
});

function loginPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_LOGIN_ERROR: {
      const { error, data } = action.payload;
      const msg = data.message ? data.message : (data.msg ? data.msg : '');

      return state
        .set('error', error)
        .set('errorMsg', msg);
    }
    default:
      return state;
  }
}

export default loginPageReducer;
