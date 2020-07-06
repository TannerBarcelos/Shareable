import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

// actions
import {setAlert} from '../../actions/alert';
import {register} from '../../actions/auth';

// destructure out props for simplicity and remember: the actions are in props, so, they as well are destrucutured. in this case, we destructured the setAlert for validation
const Register = ({setAlert, register}) => {
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
      // action! We are invoking an action here: remember it takes a message and alert type [in props as th second param of connect() maps dispatch actions to props]
      setAlert('Passwords do not match', 'danger'); //alert-type is the name of the bg color of the alert in the alert component -> dynamic styling
    } else {
      // register action: imprted and passed through proptype
      register({name, email, password});
    }
  };

  const onChange = (e) => {
    // must copy the whole state object and also change any state
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Fragment>
      {/* action will be a post request to the register api in our backend to register a user to the DB */}
      <form
        className="ui form"
        style={{
          width: '45rem',
          margin: '0 auto',
        }}
        onSubmit={(e) => onSubmit(e)}
      >
        <div className="field">
          <label> Name </label>
          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="field">
          <label> Email </label>
          <input
            type="email"
            name="email"
            placeholder="e-mail"
            value={email}
            onChange={(e) => onChange(e)}
          />
          <small>
            This app uses gravatar for profile images.Please enter an email
            registered to a gravatar account or make one if necessary
          </small>
        </div>
        <div className="field">
          <label> Password </label>
          <input
            type="password"
            name="password"
            placeholder="password"
            // minLength="6"
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
          Already have an account ? <Link to="/login"> Login </Link>
        </p>
      </form>
    </Fragment>
  );
};

//  use Component.propTypes = {prop: type } see docs! https://reactjs.org/docs/typechecking-with-proptypes.html to type chck props in the app
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};

//must pass connect mapStateToProps and mapDispatchToProps (or we can do what we did and pass the action in an object that way too [look at docs for mapdispatchtoprops..])
export default connect(null, {
  setAlert,
  register,
})(Register);
