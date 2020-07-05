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
import rootReducer from './reducers';

const initialState = {}
//const middleWare = [thunk];

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk))); //...middleware

export default store;
// we could have done this all in app.js but we extracted to clean things up