import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import { thunk } from 'redux-thunk';
import rootReducer from './reducer/RootReducer';

const initialState = {};

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
