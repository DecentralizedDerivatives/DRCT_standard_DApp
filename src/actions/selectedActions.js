import { SET_SELECTED_TOKEN, CLEAR_SELECTED_TOKEN } from './types';

export const setSelectedToken = token => dispatch => {
  dispatch({
    type: SET_SELECTED_TOKEN,
    payload: token
  });
};

export const clearSelectedToken = token => dispatch => {
  dispatch({
    type: CLEAR_SELECTED_TOKEN,
    payload: ''
  });
};
