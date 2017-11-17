import React from 'react';
import moment from 'moment'; // eslint-disable-line no-unused-vars
import 'moment/locale/zh-cn';
import { render } from 'react-dom';
import persistState from 'redux-localstorage';
import createHistory from 'history/createBrowserHistory';
import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import {  routerReducer, routerMiddleware } from 'react-router-redux';

import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';

import App from './App.dev';
import './index.css';

moment.locale('zh-cn');

const history = createHistory();
const middleware = routerMiddleware(history);

const enhancer = compose(
  persistState(null, {
    slicer: () => state => {
      const { reducers } = state;
      let { token, profile } = reducers.my || {};

      if (!token || !token.expiresIn || moment().isAfter(token.expiresIn)) {
        token = null;
        profile = null;
      }

      return {
        ...state,
        reducers: {
          ...state.reducers,
          my: {
            ...reducers.my,
            token,
            profile
          }
        }
      };
    }
  })
);

const store = createStore(
  combineReducers({
    reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware),
  enhancer
);

render(
  <App
    store={store}
    history={history}
  />,
  document.getElementById('root')
);
registerServiceWorker();
