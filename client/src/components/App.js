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
              {/**private route component to protect routes in switch so you have to be authed to go to it: see routing/PrivateRoute to see implementation */}
              <PrivateRoute exact path="/dashboard" component={Dashboard} />{' '}
            </Switch>{' '}
          </section>{' '}
        </div>{' '}
      </Router>{' '}
    </Provider>
  );
};

export default App;
