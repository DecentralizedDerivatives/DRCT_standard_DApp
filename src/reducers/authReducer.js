import { SET_USER_CONNECTED } from '../actions/types';

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER_CONNECTED:
      return {
        ...state,
        isConnected: action.payload
      };
    default:
      return state;
  }
}
