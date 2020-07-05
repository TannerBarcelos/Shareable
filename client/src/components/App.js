// react/dom imports
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
// styles
import '../../src/App.css';

// component imports
import Navbar from './layout/Navbar';
import Landing from './layout/Landing';
import Register from './auth/Register';
import Login from './auth/Login';

const App = () => {
  return (
    // wrap whole app in a browser router to allow for history API and for routing
    <Router>
      <div className="App">
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="ui container">
          {/**wrap in swith for patch matching: 
          any Link (replaces a in html can simply route to the routes we define here from anywhere in the app) */}
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </section>
      </div>
    </Router>
  );
};

export default App;
