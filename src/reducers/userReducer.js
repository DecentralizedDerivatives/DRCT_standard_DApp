import {
  SET_USER_ACCOUNT,
  SET_USER_BALANCE,
  SET_USER_TRANSACTIONS,
  SET_USER_POSITIONS,
  SET_USER_ORDERS,
  SET_CASHOUT_RECEIPT,
  SET_CASHOUT_ERROR
} from './types';

const initialState = {
  userAccount: '',
  userBalance: 0,
  userTransactions: [['loading...', 'loading...']],
  userPositions: [['loading...', 'loading...', 'loading...']],
  userOrders: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER_ACCOUNT:
      return {
        ...state,
        userAccount: action.payload
      };
    case SET_USER_BALANCE:
      return {
        ...state,
        userBalance: action.payload
      };
    case SET_USER_TRANSACTIONS:
      return {
        ...state,
        userTransactions: action.payload
      };
    case SET_USER_POSITIONS:
      return {
        ...state,
        userPositions: action.payload
      };
    case SET_USER_ORDERS:
      const { userOrderLabels, userOrders } = action.payload;
      return {
        ...state,
        userOrderLabels,
        userOrders
      };
    case SET_CASHOUT_RECEIPT:
      return {
        ...state,
        cashOutTx: action.payload
      };
    case SET_CASHOUT_ERROR:
      return {
        ...state,
        cashOutError: action.payload
      };
    default:
      return state;
  }
}
