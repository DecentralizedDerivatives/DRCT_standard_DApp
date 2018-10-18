import statusReducer from '../../reducers/statusReducer';

import {
  SET_CONNECTION_STATUS,
  SHOW_CONNECTION_MODAL,
  SET_PROCESSING,
  SET_FETCH_IN_PROGRESS,
  REMOVE_FETCH_IN_PROGRESS,
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
          verified: true,
          whiteListed: true
        }
      };

      const expectedStateChanges = {
        connectStatus: {
          metamask: true,
          network: 4,
          verified: true,
          whiteListed: true
        }
      };

      const state = statusReducer(initialState, action);
      expect(state).toEqual(Object.assign({}, initialState, expectedStateChanges));
    });
  });

  describe('SET_PROCESSING', () => {
    it('start processing', () => {
      const action = {
        type: SET_PROCESSING,
        payload: true
      };

      const expectedStateChanges = {
        isProcessing: true
      };

      const state = statusReducer(initialState, action);
      expect(state).toEqual(Object.assign({}, initialState, expectedStateChanges));
    });
    it('stop processing', () => {
      const action = {
        type: SET_PROCESSING,
        payload: false
      };

      const expectedStateChanges = {
        isProcessing: false
      };

      const state = statusReducer(initialState, action);
      expect(state).toEqual(Object.assign({}, initialState, expectedStateChanges));
    });
  });

  describe('SET_FETCH_IN_PROGRESS', () => {
    it('Set Fetching components', () => {
      const action = {
        type: SET_FETCH_IN_PROGRESS,
        payload: 'foo'
      };
      const expectedStateChanges = { fetchInProgress: ['foo'] };
      const state = statusReducer(initialState, action);
      expect(state).toEqual(Object.assign({}, initialState, expectedStateChanges));

      const newAction = {
        type: SET_FETCH_IN_PROGRESS,
        payload: 'bar'
      }
      const newExpectedStateChanges = { fetchInProgress: ['foo', 'bar'] };
      const newState = statusReducer(state, newAction);
      expect(newState).toEqual(Object.assign({}, initialState, newExpectedStateChanges));
    });
    it('Remove Fetching components', () => {
      const currentState = Object.assign({}, initialState, {fetchInProgress: ['foo', 'bar']})
      const action = {
        type: REMOVE_FETCH_IN_PROGRESS,
        payload: 'foo'
      };
      const expectedStateChanges = { fetchInProgress: ['bar'] };
      const state = statusReducer(currentState, action);
      expect(state).toEqual(Object.assign({}, initialState, expectedStateChanges));

      const newAction = {
        type: REMOVE_FETCH_IN_PROGRESS,
        payload: 'bar'
      }
      const newExpectedStateChanges = { fetchInProgress: [] };
      const newState = statusReducer(state, newAction);
      expect(newState).toEqual(Object.assign({}, initialState, newExpectedStateChanges));
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
