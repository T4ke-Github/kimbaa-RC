import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { applyMiddleware, legacy_createStore as createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { thunk } from 'redux-thunk';
import rootReducer from './reducer/RootReducer';
import authReducer from './reducer/AuthReducer';
import appReducer from './reducer/ApplicationReducer';

const initialState = {};

const mainReducer = combineReducers({
  root: rootReducer,
  auth: authReducer,
  app: appReducer
});

const store = createStore(mainReducer, initialState, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)