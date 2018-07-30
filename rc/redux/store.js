import {createStore,applyMiddleware} from 'redux';
import thunkMiddleWare from 'redux-thunk';
import loggerMiddleWare from 'redux-logger';
import promiseMiddleWare from 'redux-promise';
import reducer from './reducer.js'
import * as action from './action.js';



const store=createStore(reducer,applyMiddleware(thunkMiddleWare,promiseMiddleWare,loggerMiddleWare));

if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducer.js', () => {
      const nextRootReducer = require('./reducer.js');
      store.replaceReducer(nextRootReducer);
    });
  }



export default store;

