import { web3 } from '../ethereum';

import {
  SET_FETCHING_ERROR,
  SET_CONNECTION_STATUS,
  SHOW_CONNECTION_MODAL,
  SET_PROCESSING
} from './types';

// Check connection status
export const checkUserConnection = () => async dispatch => {
  try {
    const accounts = await web3.eth.getAccounts();
    const network = await web3.eth.net.getId();
    console.log("NETWORK",network);
    dispatch({
      type: SET_CONNECTION_STATUS,
      payload: {
        metamask: Boolean(accounts.length),
        network: network
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
