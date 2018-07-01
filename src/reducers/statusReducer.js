import {
  SET_IS_CONNECTED,
  TX_PROCESSING,
  SET_TX_RECEIPT,
  RESET_TX_STATE,
  SET_PROCESSING_ERROR
} from '../actions/types';

const initialState = {
  isConnected: false,
  txProcessing: false,
  txReceipt: '',
  processingError: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_IS_CONNECTED:
      return {
        ...state,
        isConnected: action.payload
      };
    case TX_PROCESSING:
      return {
        ...state,
        txProcessing: true
      };
    case SET_TX_RECEIPT:
      return {
        ...state,
        txReceipt: action.payload,
        txProcessing: false
      };
    case RESET_TX_STATE:
      return {
        ...state,
        txProcessing: false,
        txReceipt: '',
        processingError: null
      };
    case SET_PROCESSING_ERROR:
      return {
        ...state,
        processingError: payload
      };
    default:
      return state;
  }
}
