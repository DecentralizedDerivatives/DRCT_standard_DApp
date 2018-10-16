import statusReducer from '../../reducers/statusReducer';

import {
  SET_CONNECTION_STATUS,
  SHOW_CONNECTION_MODAL,
  SET_FETCHING_ERROR
} from '../../actions/types';

describe('statusReducer', () => {
  const initialState = {
    connectStatus: {
      metamask: false,
      network: 0,
      verified: false,
      whiteListed: false
    },
    isConnectModalOpen: false,
    isProcessing: false,
    fetchInProgress: [],
    fetchingError: []
  };

  describe('initialState', () => {
    it('should set default state', () => {
      const state = statusReducer(undefined, { type: '@@INIT' });

      expect(state).toEqual(initialState);
    });
  });

  describe('SET_CONNECTION_STATUS', () => {
    it('returns the correct state', () => {
      const action = {
        type: SET_CONNECTION_STATUS,
        payload: {
          metamask: true,
          network: 4,
          verified: true
        }
      };

      const expectedState = {
        connectStatus: {
          metamask: true,
          network: 4,
          verified: true
        },
        fetchInProgress: [],
        isConnectModalOpen: false,
        isProcessing: false,
        fetchingError: []
      };

      const state = statusReducer(initialState, action);
      expect(state).toEqual(expectedState);
    });
  });

  describe('SET_FETCHING_ERROR', () => {
    it('returns the correct state', () => {
      const action = {
        type: SET_FETCHING_ERROR,
        payload: 'Error Message'
      };

      const expectedState = {
        connectStatus: {
          metamask: false,
          network: 0,
          verified: false,
          whiteListed: false
        },
        fetchInProgress: [],
        isConnectModalOpen: false,
        isProcessing: false,
        fetchingError: ['Error Message']
      };

      const state = statusReducer(initialState, action);
      expect(state).toEqual(expectedState);
    });
  });

  describe('SHOW_CONNECTION_MODAL', () => {
    it('returns the correct state', () => {
      const action = {
        type: SHOW_CONNECTION_MODAL,
        payload: true
      };

      const expectedState = {
        connectStatus: {
          metamask: false,
          network: 0,
          verified: false,
          whiteListed: false
        },
        fetchInProgress: [],
        isConnectModalOpen: true,
        isProcessing: false,
        fetchingError: []
      };

      const state = statusReducer(initialState, action);
      expect(state).toEqual(expectedState);
    });
  });
});
