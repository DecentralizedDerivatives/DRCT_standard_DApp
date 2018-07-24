import {
  SET_SELECTED_TOKEN,
  CLEAR_SELECTED_TOKEN
} from '../actions/types';

const initialState = {
  selectedToken: '',
  selectedOrderID: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED_TOKEN:
      return {
        ...state,
        selectedToken: action.payload
      };
    case CLEAR_SELECTED_TOKEN:
      return {
        ...state,
        selectedToken: ''
      };
    default:
      return state;
  }
}
