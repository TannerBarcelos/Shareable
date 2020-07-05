/**
 * this reducer is simply used to display alerts in the frontend for any fields in the forms which are not filled out
 */

// types import for safety and the centralized action tupes
import {
  SET_ALERT,
  REMOVE_ALERT
} from '../actions/types'

const initialState = [];

// all reducers take in state (null initially ) and the action being dispatched to it
export default function (state = initialState, action) {

  // pull out type and payload from the action object that has been dispatched
  const {
    type,
    payload
  } = action;

  // always return most current state and the data from the acction being dispatched (see the redux notes from grider course)
  // default is always return state itself
  switch (type) {
    case SET_ALERT:
      return Object.assign([], ...state, payload)
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload)
    default:
      return state;
  }
}