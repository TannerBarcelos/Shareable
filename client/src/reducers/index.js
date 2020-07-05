/**
 * this file is the root reducer file which will combine all reducers as we know, and then be passed into store.js to create the actual store and add thunk and devtools
 */

import {
  combineReducers
} from 'redux';

// reducer imports to make store
import alert from '../reducers/alert'

export default combineReducers({
  alert
}); // will populate with all reducers later