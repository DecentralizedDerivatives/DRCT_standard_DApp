import { web3 } from '../ethereum';

import { GET_ERRORS, SET_USER_CONNECTED } from './types';

// Check connection status 
export const checkConnection = () => dispatch => {
  try {
    const accounts = await web3.eth.getAccounts();
    const network = await web3.eth.net.getId();
    
    dispatch({
      type: SET_USER_CONNECTED,
      payload: (accounts.length && network === 4)  
      })
    }
  } catch(err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  }
}
