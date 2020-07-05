import {
  v4 as uuid
} from 'uuid';
import {
  SET_ALERT,
  REMOVE_ALERT
} from './types';

// asycn action creator so it needs dispatch returned explicitely as a callback as we know (this is only for async action creators..
//which is what this is! We make requests to backend, so, of course it is async)
export const setAlert = (msg, alertType) => dispatch => {
  // dispatch a type of action to be performed and payload data 
  dispatch({
    type: SET_ALERT,
    payload: {
      msg,
      alertType,
      id: uuid()
    }
  })

  setTimeout(() => {
    dispatch({
      type: REMOVE_ALERT,
      payload: uuid()
    })
  }, 5000);
}