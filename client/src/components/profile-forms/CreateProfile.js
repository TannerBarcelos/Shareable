import React, {useState, Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom'; // for links and history object from an action that used it
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// actions
import {createProfile} from '../../actions/profile';

//racfp for react functional component with explicit proptypes

const CreateProfile = ({createProfile, history}) => {
  // matches model
  const [formData, setFormData] = useState({
    bio: '',
    location: '',
    instagram: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
  });

  const onChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  // will handle the submission of the data and dispatch the create profile action with all form data which will deal with sending/updating data in our action creators and then reducer will change the state
  const onSubmit = (e) => {
    e.preventDefault();
    // dispatch the action to create a profile: send it all the data and hsitory onbject
    createProfile(formData, history);
  };

  // display the social links container boolean
  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  // destructure state so we can use them as variables
  const {
    bio,
    location,
    instagram,
    twitter,
    facebook,
    linkedin,
    youtube,
  } = formData;

  return (
    <Fragment>
      <form className="ui form" onSubmit={(e) => onSubmit(e)}>
        <div className="field">
          <label>Location</label>
          <input
            type="text"
            value={location}
            name="location"
            onChange={(e) => onChange(e)}
          />
          <small>City & state is suggested (eg. Santa Clara, CA)</small>
        </div>
        <div className="field">
          <label>Bio</label>
          <textarea
            rows="2"
            value={bio}
            name="bio"
            onChange={(e) => onChange(e)}
          ></textarea>
          <small>Tell us something about you</small>
        </div>
        <button
          className="ui teal button"
          //toggle the display setting the current state to !currentstate
          onClick={() => toggleSocialInputs(!displaySocialInputs)}
          type="button"
        >
          Add social links
        </button>
        <p style={{display: 'inline', paddingLeft: '15px', fontSize: '10px'}}>
          Optional
        </p>
        {displaySocialInputs && (
          <div className="ui form" style={{marginTop: '30px'}}>
            <div className="inline fields">
              <i
                className="twitter icon"
                style={{fontSize: '30px', color: '#5da9dd'}}
              ></i>
              <input
                type="text"
                placeholder="Twitter URL"
                value={twitter}
                name="twitter"
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="inline fields">
              <i
                className="facebook icon"
                style={{fontSize: '30px', color: '#3c5a99'}}
              ></i>
              <input
                type="text"
                placeholder="Facebook URL"
                value={facebook}
                name="facebook"
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="inline fields">
              <i
                className="instagram icon"
                style={{fontSize: '30px', color: '#c50162'}}
              ></i>
              <input
                type="text"
                placeholder="Instagram URL"
                value={instagram}
                name="instagram"
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="inline fields">
              <i
                className="linkedin icon"
                style={{fontSize: '30px', color: '#0077b0'}}
              ></i>
              <input
                type="text"
                placeholder="Linkedin URL"
                value={linkedin}
                name="linkedin"
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="inline fields">
              <i
                className="youtube icon"
                style={{fontSize: '30px', color: '#f70000'}}
              ></i>
              <input
                type="text"
                placeholder="YouTube URL"
                value={youtube}
                name="youtube"
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
        )}
        <input
          className="ui green button"
          type="submit"
          value="Create Profile"
          style={{display: 'flex', marginTop: '10px'}}
        />
        <Link
          className="ui grey button"
          to="/dashboard"
          style={{
            display: 'flex',
            marginTop: '10px',
            width: '100px',
          }}
        >
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  //ptfr shortcut
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, {createProfile})(withRouter(CreateProfile)); // wrap component with 'withRouter' to allow history object to be used as a prop
