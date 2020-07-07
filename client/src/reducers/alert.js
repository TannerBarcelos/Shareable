/**
 * this reducer is simply used to display alerts in the frontend for any fields in the forms which are not filled out
 */

// types import for safety and the centralized action tupes
import {
  SET_ALERT,
  REMOVE_ALERT
} from '../actions/types';


// alert reducer
const alert = (state = [], action) => {
  // pull out type and payload from the action object that has been dispatched
  const {
    type,
    payload
  } = action;

  // always return most current state and the data from the acction being dispatched (see the redux notes from grider course)
  // default is always return state itself
  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}

export default alert;