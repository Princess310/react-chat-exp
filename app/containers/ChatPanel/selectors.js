import { createSelector } from 'reselect';
import pinyin from 'pinyin';

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

const makeSelectChatContacts = () => createSelector(
  selectChat,
  (substate) => substate.get('chatUserContacts'),
);

const makeSelectChatGroups = () => createSelector(
  selectChat,
  (substate) => substate.get('chatUserGroups'),
);

const makeSelectChatFilter = () => createSelector(
  selectChat,
  (substate) => substate.get('chatSearchFilter'),
);

const makeSelectFilterContacts = () => createSelector(
  [makeSelectChatContacts(), makeSelectChatFilter()],
  (contacts, filter) => {
    const filerList = [];

    if (contacts) {
      for (const contactList of contacts) {
        const { list } = contactList;
        for (const contact of list) {
          const convertArr = pinyin(contact.nickname, {
            segment: false,
            style: pinyin.STYLE_NORMAL,
          });
          const convertStr = convertArr.join(' ');
          if (filter.trim() !== '' && (contact.nickname.includes(filter) || convertStr.includes(filter))) {
            filerList.push(contact);
          }
        }
      }
    }

    return filerList;
  },
);

const makeSelectFilterGroups = () => createSelector(
  [makeSelectChatGroups(), makeSelectChatFilter()],
  (groups, filter) => {
    const filerList = [];

    if (groups) {
      for (const groupList of groups) {
        const { list } = groupList;
        for (const group of list) {
          const convertArr = pinyin(group.name, {
            segment: false,
            style: pinyin.STYLE_NORMAL,
          });
          const convertStr = convertArr.join(' ');
          if (filter.trim() !== '' && (group.name.includes(filter) || convertStr.includes(filter))) {
            filerList.push(group);
          }
        }
      }
    }

    return filerList;
  },
);

export default makeSelectCurrentUser;
export {
  makeSelectChatTab,
  makeSelectChatMessageUsers,
  makeSelectChatMessageGroups,
  makeSelectTouchUser,
  makeSelectTouchGroup,
  makeSelectChatContacts,
  makeSelectChatGroups,
  makeSelectFilterContacts,
  makeSelectFilterGroups,
};
