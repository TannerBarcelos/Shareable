import React, {useEffect, Fragment} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// components
import Spinner from '../layout/Spinner';
import ProfileMain from './ProfileMain';

// actions
import {getProfileById} from '../../actions/profile';

// will need to have a button on the post to link to this profile component: refer video 54/55 to see markup on how the see profile button was made

const Profile = ({
  match,
  getProfileById,
  profile: {profile, loading},
  auth,
}) => {
  useEffect(() => {
    // get the profile clicked on ID from the url
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        //this whole fragment should sit atop the profile main card and all the posts in the users page
        <Fragment>
          {/**put a link in the fragment to go back to the list of posts in the feed */}
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="ui purple button">
                Edit Profile
              </Link>
            )}
          {/* this is where all the components to build a users profile will go: conform to the design */}
          <div className="ui container" style={{marginTop: '40px'}}>
            <ProfileMain profile={profile} />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {getProfileById})(Profile);
