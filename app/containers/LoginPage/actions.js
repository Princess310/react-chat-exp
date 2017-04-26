/*
 *
 * LoginPage actions
 *
 */

import {
  DEFAULT_ACTION,
  DO_LOGIN,
  LOAD_LOGIN_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function doLogin(username, password) {
  return {
    type: DO_LOGIN,
    payload: {
      username,
      password,
    },
  };
}

export function loadLoginError(error, data) {
  return {
    type: LOAD_LOGIN_ERROR,
    payload: {
      error,
      data,
    },
  };
}
