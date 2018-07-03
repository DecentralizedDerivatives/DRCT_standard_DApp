import {
  SET_IS_CONNECTED,
  SHOW_CONNECTION_MODAL,
  SET_PROCESSING,
  SET_TX_RECEIPT,
  SET_FETCHING_ERROR
} from '../actions/types';

const initialState = {
  isConnectedMetamask: false,
  isConnectedNetwork: false,
  showConnectionModal: false,
  isProcessing: false,
  txReceipt: '',
  fetchingError: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_IS_CONNECTED:
      const { connectedMetamask, connectedNetwork } = action.payload;
      return {
        ...state,
        isConnectedMetamask: connectedMetamask,
        isConnectedNetwork: connectedNetwork
      };
    case SET_PROCESSING:
      return {
        ...state,
        isProcessing: action.payload
      };
    case SET_TX_RECEIPT:
      return {
        ...state,
        txReceipt: action.payload
      };
    case SET_FETCHING_ERROR:
      return {
        ...state,
        fetchingError: state.fetchingError.push(payload)
      };
    case SHOW_CONNECTION_MODAL:
      return {
        ...state,
        isConnectModalOpen: payload
      };
    default:
      return state;
  }
}
