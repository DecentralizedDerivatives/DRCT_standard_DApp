import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './userReducer';
import contractReducer from './contractReducer';
import orderReducer from './orderReducer';
import statusReducer from './statusReducer';
import dataReducer from './dataReducer';

export default combineReducers({
  user: userReducer,
  contract: contractReducer,
  order: orderReducer,
  status: statusReducer,
  form: formReducer,
  data: dataReducer
});
