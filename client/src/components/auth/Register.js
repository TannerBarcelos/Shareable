import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';

const Register = () => {
  // we need state for the users input -> functional approach, so, using hooks
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const {name, email, password, password2} = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    // validate matching passwords
    if (password !== password2) {
      console.log('Passwords do not match');
    } else {
      console.log(formData);
    }
  };

  const onChange = (e) => {
    // must copy the whole state object and also change any state
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  return (
    <Fragment>
      {/* action will be a post request to the register api in our backend to register a user to the DB */}
      <form
        className="ui form"
        style={{width: '45rem', margin: '0 auto'}}
        onSubmit={(e) => onSubmit(e)}
      >
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="e-mail"
            value={email}
            onChange={(e) => onChange(e)}
          />
          <small>
            This app uses gravatar for profile images. Please enter an email
            registered to a gravatar account or make one if necessary
          </small>
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
        <div className="field">
          <input
            type="password"
            name="password2"
            placeholder="Confirm password"
            minLength="6"
            value={password2}
            onChange={(e) => onChange(e)}
          />
        </div>
        <button className="ui button primary" type="submit">
          Submit
        </button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </Fragment>
  );
};
export default Register;
