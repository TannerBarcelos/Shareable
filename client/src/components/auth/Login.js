import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';

const Login = () => {
  // we need state for the users input -> functional approach, so, using hooks
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const {email, password} = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('Success');
  };

  const onChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

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

export default Login;
