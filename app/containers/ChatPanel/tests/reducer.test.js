
import { fromJS } from 'immutable';
import chatPanelReducer from '../reducer';

describe('chatPanelReducer', () => {
  it('returns the initial state', () => {
    expect(chatPanelReducer(undefined, {})).toEqual(fromJS({}));
  });
});
