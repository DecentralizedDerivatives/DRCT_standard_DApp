import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const middlewares = [thunk];
let composeEnhancer = compose;

if (process.env.NODE_ENV === 'development') {
  composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

export function initStore(initialState = {}) {
  return createStore(
    rootReducer,
    initialState,
    composeEnhancer(applyMiddleware(...middlewares))
  );
}

const Root = ({ children, initialState }) => {
  const store = initStore(initialState);

  return <Provider store={store}>{children}</Provider>;
};

export default Root;
