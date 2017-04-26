import { createSelector } from 'reselect';

/**
 * Direct selector to the loginPage state domain
 */
const selectLoginPageDomain = () => (state) => state.get('loginPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by LoginPage
 */

const makeSelectLoginPage = () => createSelector(
  selectLoginPageDomain(),
  (substate) => substate.toJS()
);

const makeSelectLoginError = () => createSelector(
  selectLoginPageDomain(),
  (substate) => {
    const error = substate.get('error');
    const msg = substate.get('errorMsg');

    return {
      error,
      msg,
    };
  }
);

export default makeSelectLoginPage;
export {
  selectLoginPageDomain,
  makeSelectLoginError,
};
