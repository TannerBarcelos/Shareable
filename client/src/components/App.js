// react/dom imports
import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// redux / redux-store
import {Provider} from 'react-redux';
import store from '../store';

import {loadUser} from '../actions/auth';
import setAuthToken from '../utils/setAuthToken';
import PrivateRoute from './routing/PrivateRoute';

// styles
import '../../src/App.css';

// component imports
import Navbar from './layout/Navbar';
import Landing from './layout/Landing';
import Register from './auth/Register';
import Login from './auth/Login';
import Alert from './layout/Alert';
import Dashboard from './dashboard/Dashboard';
import CreateProfile from './profile-forms/CreateProfile';
import EditProfile from './profile-forms/EditProfile';
import Profile from './profile/Profile';
import Posts from './posts/Posts';
import Post from './post/Post';

// if there is a token for the user on their browser, set it as the default header for all routes thereafter
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  // equivalent to componentDidmount in class based lifecycle: must put [] in second param to make it run only once
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    // wrap the whole app in the redux store provider and pass it the store we initialize in store.js
    <Provider store={store}>
      <Router>
        <div className="ui container">
          <Navbar />
          <Route exact path="/" component={Landing} />{' '}
          <section>
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />{' '}
              <Route exact path="/login" component={Login} />{' '}
              <Route exact path="/profile/:id" component={Profile} />{' '}
              {/**private route component to protect routes in switch so you have to be authed to go to it: see routing/PrivateRoute to see implementation */}{' '}
              <PrivateRoute exact path="/dashboard" component={Dashboard} />{' '}
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />{' '}
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />{' '}
              <PrivateRoute exact path="/posts" component={Posts} />{' '}
              <PrivateRoute exact path="/posts/:id" component={Post} />{' '}
            </Switch>{' '}
          </section>{' '}
        </div>{' '}
      </Router>{' '}
    </Provider>
  );
};

export default App;
