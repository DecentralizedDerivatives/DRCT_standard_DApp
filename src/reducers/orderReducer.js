import {
  SET_ORDER_DETAILS,
  SET_BUY_ORDER_RECEIPT,
  SET_BUY_ORDER_ERROR,
  SET_UNLIST_ORDER_RECEIPT,
  SET_UNLIST_ORDER_ERROR,
  SET_LIST_ORDER,
  SET_LIST_ORDER_ERROR,
  SET_LIST_ORDER_APPROVED,
  SET_LIST_ORDER_APPROVE_ERROR
} from '../actions/types';

const initialState = {
  orderDetails: '',
  buy: {
    id: '',
    orderId: 0
  },
  buyOrderError: null,
  list: {
    id: '',
    token: '',
    price: 0,
    tokenAmount: 0,
    approved: false,
    approveTx: ''
  },
  listOrderError: null,
  listOrderApproveError: null,
  unlist: {
    id: '',
    orderId: ''
  },
  unlistOrderError: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ORDER_DETAILS:
      return {
        ...state,
        orderDetails: action.payload
      };
    case SET_BUY_ORDER_RECEIPT:
      return {
        ...state,
        buy: action.payload
      };
    case SET_BUY_ORDER_ERROR:
      return {
        ...state,
        buyOrderError: action.payload
      };
    case SET_UNLIST_ORDER_RECEIPT:
      return {
        ...state,
        unlist: action.payload
      };
    case SET_UNLIST_ORDER_ERROR:
      return {
        ...state,
        unlistOrderError: action.payload
      };
    case SET_LIST_ORDER:
      return {
        ...state,
        list: {
          ...state.list,
          ...action.payload
        }
      };
    case SET_LIST_ORDER_ERROR:
      return {
        ...state,
        listOrderError: action.payload
      };
    case SET_LIST_ORDER_APPROVED:
      return {
        ...state,
        list: {
          ...state.list,
          ...action.payload
        }
      };
    case SET_LIST_ORDER_APPROVE_ERROR:
      return {
        ...state,
        listOrderApproveError: action.payload
      };
    default:
      return state;
  }
}
