import api from '../api';
import { SET_PRICECHART_DATA, SET_FETCHING_ERROR } from './types';

export const getPriceChartData = type => async dispatch => {
  try {
    const data = await api[type].get();
      
    dispatch({
      type: SET_PRICECHART_DATA,
      payload: data 
    });      

  } catch (err) {
    dispatch({
      type: SET_FETCHING_ERROR,
      payload: 'PriceChart: ' + err.message.split('\n')[0]
    });
  }
};
