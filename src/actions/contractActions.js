import { web3 } from '../ethereum';
import { SET_CONTRACT_DETAILS, SET_PROCESSING_ERROR } from './types';

export const getContractDetails = () => async dispatch => {
  try {
    const factory = await Factory.at(
      '0x15bd4d9dd2dfc5e01801be8ed17392d8404f9642'
    );

    const response = await factory.getVariables();

    const details = {
      contractAddress: response[0],
      contractDuration: response[1].c[0],
      contractMultiplier: response[2].c[0],
      oracleAddress: response[3]
    };

    dispatch({
      type: SET_CONTRACT_DETAILS,
      payload: details
    });
  } catch (err) {
    dispatch({
      type: SET_PROCESSING_ERROR,
      payload: err.message.split('\n')[0]
    });
  }
};
