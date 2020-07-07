/**
 * this file is the root reducer file which will combine all reducers as we know, and then be passed into store.js to create the actual store and add thunk and devtools
 */

import {
  combineReducers
} from 'redux';

// reducer imports to make store
import alert from './alert';
import authenticate from './auth';
import profile from './profile';
import post from './post'

// our combined reducers to be passed into the store we create in store.js
const reducers = combineReducers({
  alert,
  auth: authenticate,
  profile,
  post
});

export default reducers;