/**
 * this file will make the whole store for us in redux [combining all our reducers into one store to be exported]
 */
import {
  createStore,
  applyMiddleware
} from 'redux';
import {
  composeWithDevTools
} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from './reducers'; //imports index.js which is where we combined all reducers

const store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(thunk)));

export default store;