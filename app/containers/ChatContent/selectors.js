import { createSelector } from 'reselect';

/**
 * Direct selector to the chatContent state domain
 */
const selectChatContentDomain = () => (state) => state.get('chatContent');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ChatContent
 */

const makeSelectChatContent = () => createSelector(
  selectChatContentDomain(),
  () => null
);

export default makeSelectChatContent;
export {
  selectChatContentDomain,
};
