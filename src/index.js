import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import allReducers from './reducers/index';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import dynamicMiddlewares from 'redux-dynamic-middlewares'
import thunk from 'redux-thunk'
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const myStore = createStore(allReducers, composeEnhancer(applyMiddleware(dynamicMiddlewares, thunk)));

ReactDOM.render(
  
  <Provider store={myStore}>
      <App />
  </Provider>,
  document.getElementById('root')
);
