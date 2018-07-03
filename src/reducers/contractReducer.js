import {
  SET_CONTRACT_DETAILS,
  SET_ORDERBOOK,
  SET_RECENT_TRADES,
  SET_CONTRACT_OPEN_DATES,
  SET_CONTRACT_CREATED,
  SET_CONTRACT_ERROR,
  SET_CONTRACT_FUNDED,
  SET_SEND_FUNDS_ERROR
} from './types';

const initialState = {
  contractAddress: '',
  contractDuration: '',
  contractMultiplier: '',
  oracleAddress: '',
  orderbook: ['loading...', 'loading...', 'loading...', 'loading...', '...'],
  recentTrades: [['No Recent Trades', '...', '...']],
  contractOpenDates: [],
  newContractAddress: '',
  newContractTx: '',
  newContractError: null
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
    case SET_ORDERBOOK:
      return {
        ...state,
        orderbook: action.payload
      };
    case SET_RECENT_TRADES:
      return {
        ...state,
        recentTrades: action.payload
      };
    case SET_CONTRACT_OPEN_DATES:
      return {
        ...state,
        contractOpenDates: action.payload
      };
    case SET_CONTRACT_CREATED:
      return {
        ...state,
        newContractAddress: action.payload,
        newContractTx: action.payload
      };
    case SET_CONTRACT_ERROR:
      return {
        ...state,
        newContractError: action.payload
      };
    case SET_CONTRACT_FUNDED:
      return {
        ...state,
        newContractFunded: action.payload
      };
    case SET_SEND_FUNDS_ERROR:
      return {
        ...state,
        newContractFundsError: action.payload
      };
    default:
      return state;
  }
}
