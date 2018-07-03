import {
  SET_CONTRACT_DETAILS,
  SET_ORDERBOOK,
  SET_RECENT_TRADES
} from './types';

const initialState = {
  contractAddress: '',
  contractDuration: '',
  contractMultiplier: '',
  oracleAddress: '',
  orderbook: ['loading...', 'loading...', 'loading...', 'loading...', '...'],
  recentTrades: [['No Recent Trades', '...', '...']]
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
    default:
      return state;
  }
}
