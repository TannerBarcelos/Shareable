import {REGISTER_SUCCESS, REGISTER_FAIL} from '../actions/types';

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
export default function (state = initialState, action) {
  // pull out the action data into a destructured statement
  const {type, payload} = action;

  switch (type) {
    // if success, save the token in to local storage and assign it the token from the response to the backend when we signed up
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token);
      // create new state with the old state including the new state and the opposite of the current state
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };

    // failed to register so remove the token from local storage
    case REGISTER_FAIL:
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
