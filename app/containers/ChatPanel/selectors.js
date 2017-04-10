import { createSelector } from 'reselect';

/**
 * Direct selector to the chatPanel state domain
 */

const selectAppGlobale = (state) => state.get('global');
const selectChat = (state) => state.get('chat');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ChatPanel
 */

const makeSelectCurrentUser = () => createSelector(
  selectAppGlobale,
  (globalState) => globalState.get('currentUser')
);

const makeSelectChatTab = () => createSelector(
  selectChat,
  (substate) => substate.get('chatTab')
);

const makeSelectChatMessageUsers = () => createSelector(
  selectChat,
  (substate) => substate.get('chatMassageUsers')
);

export default makeSelectCurrentUser;
export {
  makeSelectChatTab,
  makeSelectChatMessageUsers,
};
