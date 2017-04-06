/*
 *
 * LoginPage actions
 *
 */

import {
  DEFAULT_ACTION,
  DO_LOGIN
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
      password
    }
  }
}
