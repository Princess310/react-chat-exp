/*
 *
 * WeChatLogin actions
 *
 */

import {
  DEFAULT_ACTION,
  DO_WECHAT_LOGIN,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function doWechatLogin(code) {
  return {
    type: DO_WECHAT_LOGIN,
    payload: {
      code,
    },
  };
}
