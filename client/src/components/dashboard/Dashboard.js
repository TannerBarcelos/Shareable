import React, {useEffect, Fragment} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCurrentUsersProfile, deleteAccount} from '../../actions/profile';

//components
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';

const Dashboard = ({
  getCurrentUsersProfile,
  deleteAccount,
  auth: {user},
  profile: {profile, loading},
}) => {
  // use effect lifecycle hook : same as componentdidmount
  useEffect(() => {
    getCurrentUsersProfile();
  }, [getCurrentUsersProfile]);

  // load in the profile and until then, load a spinner like modal
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary"> Profile Management </h1>{' '}
      <p>
        <i className="fas fa-user"> </i>Welcome {user && user.name}{' '}
      </p>{' '}
      {profile !== null ? (
        <Fragment>
          {' '}
          {/* If the users profile does exist, allow them to edit the profile by mounting this component here which has a link [designed as a button] to go to the /edit-profile route */}{' '}
          <DashboardActions />
          <button
            className="ui red button"
            style={{
              marginTop: '20px',
            }}
            onClick={() => deleteAccount()}
          >
            Delete My Account{' '}
          </button>{' '}
        </Fragment>
      ) : (
        <Fragment>
          <p> You have not yet setup a profile.Please add some info </p>{' '}
          <Link to="/create-profile" className="ui green button">
            Create Profile{' '}
          </Link>{' '}
        </Fragment>
      )}{' '}
    </Fragment>
  );
};

// proptypes ensure that a) we pass all the props in to safeguard errors but also to make sure they are of the exact type we expect
Dashboard.propTypes = {
  // ptfr shortcut
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

// get profile and auth state
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    profile: state.profile,
  };
};

export default connect(mapStateToProps, {
  getCurrentUsersProfile,
  deleteAccount,
})(Dashboard);
