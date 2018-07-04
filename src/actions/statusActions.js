import { web3 } from '../ethereum';

import {
  SET_FETCHING_ERROR,
  SET_IS_CONNECTED,
  SHOW_CONNECTION_MODAL,
  SET_PROCESSING
} from './types';

// Check connection status
export const checkUserConnection = () => async dispatch => {
  try {
    const accounts = await web3.eth.getAccounts();
    const network = await web3.eth.net.getId();

    dispatch({
      type: SET_IS_CONNECTED,
      payload: {
        connectedMetamask: accounts.length,
        connectedNetwork: network === 4
      }
    });
  } catch (err) {
    dispatch({
      type: SET_FETCHING_ERROR,
      payload: err.message.split('\n')[0]
    });
  }
};

// Set connection modal status
export const showConnectionModal = status => {
  return {
    type: SHOW_CONNECTION_MODAL,
    payload: status
  };
};

export const setProcessing = status => {
  return {
    type: SET_PROCESSING,
    payload: status
  };
};
