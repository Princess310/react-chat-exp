import { createSelector } from 'reselect';

/**
 * Direct selector to the chatPanel state domain
 */

const selectAppGlobale = (state) => state.get('global');

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

export default makeSelectCurrentUser;
