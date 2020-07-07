import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
} from '../actions/types';

// handles registration success and failure

// initial state is the token in local storage and authenticated to null [not authenticated and registered], loading state to true
//
const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
};

// this allows us to just import the file and use it as the key for a reducer in our store rather than a named export
const authenticate = (state = initialState, action) => {
  // pull out the action data into a destructured statement
  const {
    type,
    payload
  } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
          loading: false,
          user: payload,
      };
      // if success, save the token in to local storage and assign it the token from the response to the backend when we signed up
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      // create new state with the old state including the new state and the opposite of the current state
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
          loading: false,
      };

      // failed to register so remove the token from local storage, auth error and login fail all do same thing
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
          isAuthenticated: false,
          loading: false,
      };

    default:
      return state;
  }
}

export default authenticate;