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

const makeSelectChatRevokeList = () => createSelector(
  selectChat,
  (substate) => substate.get('revokeList'),
);

const makeSelectChatMessageList = () => createSelector(
  [makeSelectChatMessage(), makeSelectChatRevokeList()],
  (msgList, revokeList) => {
    let list = [];

    if (msgList) {
      list = msgList.filter((msg) => (!revokeList.includes(msg.msgId)));
    }

    return list;
  },
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

const makeSelectTouchGroup = () => createSelector(
  selectChat,
  (substate) => substate.get('chatTouchGroup'),
);

const makeSelectChatGroupMessage = () => createSelector(
  selectChat,
  (substate) => substate.get('chatGroupMessageList'),
);

const makeSelectChatGroupMessageList = () => createSelector(
  [makeSelectChatGroupMessage(), makeSelectChatRevokeList()],
  (msgList, revokeList) => {
    let list = [];

    if (msgList) {
      list = msgList.filter((msg) => (!revokeList.includes(msg.msgId)));
    }

    return list;
  },
);

const makeSelectGroupNextkey = () => createSelector(
  selectChat,
  (substate) => substate.get('chatGroupMessageNextkey'),
);

const makeSelectChatContact = () => createSelector(
  selectChat,
  (substate) => substate.get('chatUserContact'),
);

const makeSelectChatGroup = () => createSelector(
  selectChat,
  (substate) => substate.get('chatUserGroup'),
);

const makeSelectLoadingTouchUser = () => createSelector(
  selectChat,
  (substate) => substate.get('loadingTouchUser'),
);

const makeSelectLoadingMessageList = () => createSelector(
  selectChat,
  (substate) => substate.get('loadingMessageList'),
);

const makeSelectLoadingGroupMessageList = () => createSelector(
  selectChat,
  (substate) => substate.get('loadingGroupMessageList'),
);

export {
  makeSelectChatTab,
  makeSelectChatMessageList,
  makeSelectCurrentUser,
  makeSelectTouchUser,
  makeSelectClearChatMessage,
  makeSelectMessageNextkey,
  makeSelectTouchGroup,
  makeSelectChatGroupMessageList,
  makeSelectGroupNextkey,
  makeSelectChatContact,
  makeSelectChatGroup,
  makeSelectLoadingTouchUser,
  makeSelectLoadingMessageList,
  makeSelectLoadingGroupMessageList,
};
