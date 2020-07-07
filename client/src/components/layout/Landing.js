import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const btn_box = {
  margin: '0 20px 0 20px',
};

const Landing = ({isAuthenticated}) => {
  // if the user is authenticated (logged in) prevent them from ever going back home by doing this chekc
  if (isAuthenticated) {
    return <Redirect to={'/dashboard'} />;
  }

  return (
    <div
      style={{
        margin: '30vh auto',
        textAlign: 'center',
        padding: '20px',
      }}
    >
      <h3
        style={{
          fontSize: '4rem',
        }}
      >
        {' '}
        Shareable{' '}
      </h3>{' '}
      <p
        style={{
          fontSize: '1.5rem',
        }}
      >
        {' '}
        A social network{' '}
      </p>{' '}
      <Link to="/register" className="ui green button" style={btn_box}>
        Register{' '}
      </Link>{' '}
      <Link to="/login" className="ui blue button" style={btn_box}>
        Login{' '}
      </Link>{' '}
    </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps)(Landing);
