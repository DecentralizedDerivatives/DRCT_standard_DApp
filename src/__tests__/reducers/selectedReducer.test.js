import selectedReducer from '../../reducers/selectedReducer';

import {
  SET_CURRENT,
  SET_SELECTED_TOKEN,
  CLEAR_SELECTED_TOKEN
} from '../../actions/types';

describe('selectedReducer', () => {
  const initialState = {
    selectedToken: '',
    selectedOrderID: ''
  };

  describe('initialState', () => {
    it('should set default state', () => {
      const state = selectedReducer(undefined, { type: '@@INIT' });

      expect(state).toEqual(initialState);
    });
  });

  describe('SET_SELECTED_TOKEN', () => {
    it('returns the correct state', () => {
      const action = {
        type: SET_SELECTED_TOKEN,
        payload: '0x0'
      };

      const expectedState = {
        ...initialState,
        selectedToken: '0x0'
      };

      const state = selectedReducer(initialState, action);
      expect(state).toEqual(expectedState);
    });
  });

  describe('CLEAR_SELECTED_TOKEN', () => {
    it('returns the correct state', () => {
      const action = {
        type: CLEAR_SELECTED_TOKEN,
        payload: ''
      };

      const expectedState = {
        ...initialState,
        selectedToken: ''
      };

      const state = selectedReducer(initialState, action);
      expect(state).toEqual(expectedState);
    });
  });
});
