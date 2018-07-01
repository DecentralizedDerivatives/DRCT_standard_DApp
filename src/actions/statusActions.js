import { web3 } from '../ethereum';

import { SET_PROCESSING_ERROR, SET_IS_CONNECTED, TX_PROCESSING } from './types';

// Check connection status
export const checkConnection = () => async dispatch => {
  try {
    const accounts = await web3.eth.getAccounts();
    const network = await web3.eth.net.getId();

    dispatch({
      type: SET_IS_CONNECTED,
      payload: accounts.length && network === 4
    });
  } catch (err) {
    dispatch({
      type: SET_PROCESSING_ERROR,
      payload: err.message.split('\n')[0]
    });
  }
};

// Set processing status
export const setProcessing = () => {
  return {
    type: TX_PROCESSING
  };
};
