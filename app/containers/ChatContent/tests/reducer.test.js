
import { fromJS } from 'immutable';
import chatContentReducer from '../reducer';

describe('chatContentReducer', () => {
  it('returns the initial state', () => {
    expect(chatContentReducer(undefined, {})).toEqual(fromJS({}));
  });
});
