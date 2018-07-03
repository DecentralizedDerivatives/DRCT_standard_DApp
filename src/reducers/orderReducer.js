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
} from './types';

const initialState = {
  orderDetails: '',
  buyOrderTx: '',
  buyOrderError: null,
  unlistOrderTx: '',
  unlistOrderError: null,
  listOrderTx: '',
  listOrderError: null,
  listOrderApproved: '',
  listOrderApproveError: null
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
        buyOrderTx: action.payload
      };
    case SET_BUY_ORDER_ERROR:
      return {
        ...state,
        buyOrderError: action.payload
      };
    case SET_UNLIST_ORDER:
      return {
        ...state,
        unlistOrderTx: action.payload
      };
    case SET_UNLIST_ORDER_ERROR:
      return {
        ...state,
        unlistOrderError: action.payload
      };
    case SET_LIST_ORDER:
      return {
        ...state,
        listOrderTx: action.payload
      };
    case SET_LIST_ORDER_ERROR:
      return {
        ...state,
        listOrderError: action.payload
      };
    case SET_LIST_ORDER_APPROVED:
      return {
        ...state,
        listOrderApproved: action.payload
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
