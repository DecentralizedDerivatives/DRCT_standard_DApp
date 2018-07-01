import { SET_ORDER_DETAILS, SET_SELECTED_TOKEN } from './types';

const initialState = {
  orderDetails: '',
  selectedToken: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ORDER_DETAILS:
      return {
        ...state,
        orderDetails: action.payload
      };
    case SET_SELECTED_TOKEN:
      return {
        ...state,
        selectedToken: action.payload
      };
    default:
      return state;
  }
}
