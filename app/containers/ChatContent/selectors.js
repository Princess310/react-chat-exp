import { createSelector } from 'reselect';

/**
 * Direct selector to the chatContent state domain
 */
const selectAppGlobale = (state) => state.get('global');
const selectChat = (state) => state.get('chat');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ChatContent
 */

const makeSelectChatTab = () => createSelector(
  selectChat,
  (substate) => substate.get('chatTab'),
);

const makeSelectChatMessage = () => createSelector(
  selectChat,
  (substate) => substate.get('chatMessageList'),
);

const makeSelectCurrentUser = () => createSelector(
  selectAppGlobale,
  (globalState) => globalState.get('currentUser'),
);

const makeSelectTouchUser = () => createSelector(
  selectChat,
  (substate) => substate.get('chatTouchUser'),
);

const makeSelectClearChatMessage = () => createSelector(
  selectChat,
  (substate) => substate.get('clearChatContent'),
);

const makeSelectMessageNextkey = () => createSelector(
  selectChat,
  (substate) => substate.get('chatMessageNextkey'),
);

export {
  makeSelectChatTab,
  makeSelectChatMessage,
  makeSelectCurrentUser,
  makeSelectTouchUser,
  makeSelectClearChatMessage,
  makeSelectMessageNextkey,
};
