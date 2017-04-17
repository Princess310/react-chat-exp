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

const makeSelectChatMessageGroups = () => createSelector(
  selectChat,
  (substate) => substate.get('chatMessageGroups')
);

const makeSelectTouchUser = () => createSelector(
  selectChat,
  (substate) => substate.get('chatTouchUser'),
);

const makeSelectTouchGroup = () => createSelector(
  selectChat,
  (substate) => substate.get('chatTouchGroup'),
);

export default makeSelectCurrentUser;
export {
  makeSelectChatTab,
  makeSelectChatMessageUsers,
  makeSelectChatMessageGroups,
  makeSelectTouchUser,
  makeSelectTouchGroup,
};
