import { createSelector } from 'reselect';

/**
 * Direct selector to the weChatLogin state domain
 */
const selectWeChatLoginDomain = () => (state) => state.get('weChatLogin');

/**
 * Other specific selectors
 */


/**
 * Default selector used by WeChatLogin
 */

const makeSelectWeChatLogin = () => createSelector(
  selectWeChatLoginDomain(),
  (substate) => substate.toJS()
);

export default makeSelectWeChatLogin;
export {
  selectWeChatLoginDomain,
};
