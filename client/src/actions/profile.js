import axios from 'axios';

// actions
import {
  setAlert
} from './alert';

// action types
import {
  GET_PROFILE,
  PROFILE_ERROR
} from './types';

// get current users profile: uses the token
export const getCurrentUsersProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// create or update a profile: uses the form data [passed into the action creator in the actual component to invoke the action] and history object that exists in all props in router [async action creator here]
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // notice we use disdpatch everywhere we want to dispatch an action for.. different from react course where we return a simple object...
    // this way is much more explicit and neat to me.. in order to allow this, though, we need to pass n the dispatch callback regardless of async or not
    // for all the functions.. adobt this design paradigm

    const res = await axios.post('/api/profile', formData, config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created'));

    // creating? redirect else stay
    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};