import { createSelector } from 'reselect';

/**
 * Direct selector to the chatPage state domain
 */
const selectChatPageDomain = () => (state) => state.get('chat');

const selectAppGlobale = (state) => state.get('global');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ChatPage
 */

const makeSelectChatPage = () => createSelector(
  selectChatPageDomain(),
  (substate) => substate.toJS()
);

const makeSelectCurrentUser = () => createSelector(
  selectAppGlobale,
  (globalState) => globalState.get('currentUser')
);

export default makeSelectChatPage;
export {
  selectChatPageDomain,
  makeSelectCurrentUser,
};
