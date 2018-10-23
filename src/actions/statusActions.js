import { web3, Factory } from '../ethereum';

import FactoryProvider from '../factoryProvider';
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
    var whiteListed = false;
    if (accounts.length > 0) {
      const factory = await Factory.at(FactoryProvider.factories()[0].address);
      whiteListed = await factory.isWhitelisted(accounts[0]);
    }
    dispatch({
      type: SET_CONNECTION_STATUS,
      payload: {
        metamask: Boolean(accounts.length),
        network,
        whiteListed,
        verified: true
      }
    });
  } catch (err) {
    // console.log('CAUGHT ERROR', err.message)
    dispatch({
      type: SET_CONNECTION_STATUS,
      payload: {
        metamask: false,
        network: 0,
        whiteListed: false,
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
