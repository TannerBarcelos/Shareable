import React, {Fragment, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

// actions
import {login} from '../../actions/auth';

const Login = ({login, isAuthenticated}) => {
  // we need state for the users input -> functional approach, so, using hooks
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const {email, password} = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    // login
    login(email, password);
  };

  const onChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  // redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <form
        className="ui form"
        style={{width: '45rem', margin: '0 auto'}}
        onSubmit={(e) => onSubmit(e)}
      >
        <div className="field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="e-mail"
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            minLength="6"
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <button className="ui button primary" type="submit">
          Sign In
        </button>
        <p>
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </form>
    </Fragment>
  );
};

// proptype validation
Login.propTypes = {
  // alias the login as a prop and type ptfr for es7+ snippets to make sure we absolutely take in a function called login as a prop
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

// get users state of logged in or not
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps, {login})(Login);
