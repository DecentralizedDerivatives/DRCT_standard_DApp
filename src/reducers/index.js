import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux';
import accountReducer from './accountReducer';
import contractReducer from './contractReducer';
import orderReducer from './orderReducer';
import statusReducer from './statusReducer';

export default combineReducers({
  account: accountReducer,
  contract: contractReducer,
  order: orderReducer,
  status: statusReducer,
  form: formReducer
});
