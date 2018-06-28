import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux';
import authReducer from './authReducer';

export default combineReducers({
  auth: authReducer,
  form: formReducer
});
