import {
  SET_CONNECTION_STATUS,
  SHOW_CONNECTION_MODAL,
  SET_PROCESSING,
  SET_FETCH_IN_PROGRESS,
  REMOVE_FETCH_IN_PROGRESS,
  SET_FETCHING_ERROR
} from '../actions/types';

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

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CONNECTION_STATUS:
      return {
        ...state,
        connectStatus: action.payload
      };
    case SET_PROCESSING:
      return {
        ...state,
        isProcessing: action.payload
      };
    case SET_FETCH_IN_PROGRESS:
      return {
        ...state,
        fetchInProgress: state.fetchInProgress.concat(action.payload)
      };
    case REMOVE_FETCH_IN_PROGRESS:
      return {
        ...state,
        fetchInProgress: state.fetchInProgress.filter(i => i !== action.payload)
      }
    case SET_FETCHING_ERROR:
      return {
        ...state,
        fetchingError: [...state.fetchingError, action.payload]
      };
    case SHOW_CONNECTION_MODAL:
      return {
        ...state,
        isConnectModalOpen: action.payload
      };
    default:
      return state;
  }
}
