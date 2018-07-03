import { SET_ORDER_DETAILS } from './types';

const initialState = {
  orderDetails: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ORDER_DETAILS:
      return {
        ...state,
        orderDetails: action.payload
      };
    default:
      return state;
  }
}
