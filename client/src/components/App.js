// react/dom imports
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// redux / redux-store
import {Provider} from 'react-redux';
import store from '../store';

// styles
import '../../src/App.css';

// component imports
import Navbar from './layout/Navbar';
import Landing from './layout/Landing';
import Register from './auth/Register';
import Login from './auth/Login';
import Alert from './layout/Alert';

const App = () => {
  return (
    // wrap the whole app in the redux store provider and pass it the store we initialize in store.js
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />{' '}
          <section className="ui container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />{' '}
              <Route exact path="/login" component={Login} />{' '}
            </Switch>{' '}
          </section>{' '}
        </div>{' '}
      </Router>{' '}
    </Provider>
  );
};

export default App;
