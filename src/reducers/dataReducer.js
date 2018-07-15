import { SET_PRICECHART_DATA } from '../actions/types';

const initialState = {
  pricechart: undefined
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_PRICECHART_DATA:
      return {
        ...state,
        pricechart: action.payload
      };
    default:
      return state;
  }
}

