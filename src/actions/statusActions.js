import { web3 } from '../ethereum';

import {
  SET_FETCHING_ERROR,
  SET_CONNECTION_STATUS,
  SHOW_CONNECTION_MODAL
} from './types';

// Check connection status
export const checkUserConnection = () => async dispatch => {
  try {
    const accounts = await web3.eth.getAccounts();
    const network = await web3.eth.net.getId();

    dispatch({
      type: SET_CONNECTION_STATUS,
      payload: {
        metamask: Boolean(accounts.length),
        network: network,
        verified: true
      }
    });
  } catch (err) {
    dispatch({
      type: SET_CONNECTION_STATUS,
      payload: {
        metamask: false,
        network: 0,
        verified: true
      }
    });

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
