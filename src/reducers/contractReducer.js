import { SET_CONTRACT_DETAILS } from './types';

const initialState = {
  contractAddress: '',
  contractDuration: '',
  contractMultiplier: '',
  oracleAddress: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CONTRACT_DETAILS:
      const {
        contractAddress,
        contractDuration,
        contractAddress,
        oracleAddress
      } = action.payload;
      return {
        ...state,
        contractAddress,
        contractDuration,
        contractMultiplier,
        oracleAddress
      };
    default:
      return state;
  }
}
