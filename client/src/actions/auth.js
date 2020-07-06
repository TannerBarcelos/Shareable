import axios from 'axios';
import {setAlert} from './alert';
import {REGISTER_SUCCESS, REGISTER_FAIL} from './types';

// register user: calls the backend route to register user : takes in name, email and password from object passed to it in componnet and will
//make an ajax call to the backend auth route: we get the token back!
export const register = ({name, email, password}) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    name,
    email,
    password,
  });

  try {
    // try to request to the backend
    const res = await axios.post('/api/users', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    // get the error array from the backend
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
