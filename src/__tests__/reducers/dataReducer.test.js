import dataReducer from '../../reducers/dataReducer';

import { SET_PRICECHART_DATA } from '../../actions/types';

describe('dataReducer', () => {
  const initialState = {
    pricechart: undefined,
  };

  describe('initialState', () => {
    it('should set default state', () => {
      const state = dataReducer(undefined, { type: '@@INIT' });

      expect(state).toEqual(initialState);
    });
  });

  describe('SET_PRICECHART_DATA', () => {
    it('returns the correct state', () => {
      const action = {
        type: SET_PRICECHART_DATA,
        payload: [[1524574800000, 9277.61], [1524, 6673.74]],
      };

      const expectedState = {
        ...initialState,
        pricechart: [[1524574800000, 9277.61], [1524, 6673.74]],
      };

      const state = dataReducer(initialState, action);
      expect(state).toEqual(expectedState);
    });
  });
});
