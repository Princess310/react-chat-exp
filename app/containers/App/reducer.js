/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  LOAD_USER,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  currentUser: {},
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER: {
      const { data } = action.payload;

      return state.set('currentUser', data);
    }
    default: {
      return state;
    }
  }
}

export default appReducer;
