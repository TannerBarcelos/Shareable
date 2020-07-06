/**
 * this file is the root reducer file which will combine all reducers as we know, and then be passed into store.js to create the actual store and add thunk and devtools
 */

import {
  combineReducers
} from 'redux';

// reducer imports to make store
import alert from './alert';
import auth from './auth';
import profile from './profile'

export default combineReducers({
  alert, // can access with alert
  auth, // can access this state with state.auth in mapstate
  profile
}); // will populate with all reducers later