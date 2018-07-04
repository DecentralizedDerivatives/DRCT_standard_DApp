import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './userReducer';
import contractReducer from './contractReducer';
import selectedReducer from './selectedReducer';
import orderReducer from './orderReducer';
import statusReducer from './statusReducer';

export default combineReducers({
  user: userReducer,
  contract: contractReducer,
  selected: selectedReducer,
  order: orderReducer,
  status: statusReducer,
  form: formReducer
});
