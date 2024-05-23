import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { applyMiddleware, legacy_createStore as createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { thunk } from 'redux-thunk';
import rootReducer from './reducer/RootReducer';
import authReducer from './reducer/AuthReducer';

const initialState = {};

const mainReducer = combineReducers({
  root: rootReducer,
  auth: authReducer
});

const store = createStore(mainReducer, initialState, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)