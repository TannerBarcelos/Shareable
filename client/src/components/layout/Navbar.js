import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth';

const localStyleLogo = {
  width: '5rem',
  height: '5rem',
  fontSize: '3rem',
  borderRadius: '50%',
  padding: '10px',
};

// always visible component in App: notice use of Link here..
// we will have the links link to other pages in the app which is allowed by our browser router in out app
const Navbar = ({auth: {isAuthenticated, loading}, logout}) => {
  // if logged in will show this
  const authLinks = (
    <div className="right menu">
      <Link to="/dashboard" className="item active">
        <i className="fas fa-user" />
        Profile
      </Link>
      <Link to="/posts" className="item active">
        <i className="fas fa-th-list"> </i> Feed
      </Link>
      <Link to="/" className="item active" onClick={logout}>
        <i className="fas fa-sign-out-alt"> </i> Logout
      </Link>
    </div>
  );

  // default shows this
  const guestLinks = (
    <div className="right menu">
      <Link to="/" className="item active">
        Home{' '}
      </Link>{' '}
      <Link to="/register" className="item">
        Register{' '}
      </Link>{' '}
      <Link to="/login" className="item">
        Login{' '}
      </Link>{' '}
    </div>
  );

  return (
    <div className="ui secondary menu">
      <Link to="/">
        <i className="far fa-handshake" style={localStyleLogo}>
          {' '}
        </i>{' '}
      </Link>{' '}
      {!loading && (
        <Fragment> {isAuthenticated ? authLinks : guestLinks} </Fragment>
      )}{' '}
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

// map the authenticated boolean
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {
  logout,
})(Navbar);
