import React, {useEffect, Fragment} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCurrentUsersProfile} from '../../actions/profile';

//components
import Spinner from '../layout/Spinner';

const Dashboard = ({
  getCurrentUsersProfile,
  auth: {user},
  profile: {profile, loading},
}) => {
  // use effect lifecycle hook : same as componentdidmount
  useEffect(() => {
    getCurrentUsersProfile();
  }, []);

  // load in the profile and until then, load a spinner like modal
  return loading && profile === null ? (
    // <p>Hello</p>
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Profile</h1>
      <p>
        <i className="fas fa-user"></i>Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>has</Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile. Please add some info</p>
          <Link to="/create-profile" className="ui green button">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

// get profile and auth state
const mapStateToProps = (state) => {
  return {auth: state.auth, profile: state.profile};
};

export default connect(mapStateToProps, {getCurrentUsersProfile})(Dashboard);
