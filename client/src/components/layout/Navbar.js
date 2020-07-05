import React from 'react';
import {Link} from 'react-router-dom';

const localStyleLogo = {
  width: '5rem',
  height: '5rem',
  fontSize: '3rem',
  borderRadius: '50%',
  padding: '10px',
};

// always visible component in App: notice use of Link here..
// we will have the links link to other pages in the app which is allowed by our browser router in out app
const Navbar = () => {
  return (
    <div className="ui secondary menu">
      <Link to="/">
        <i className="far fa-handshake" style={localStyleLogo}></i>
      </Link>
      <div className="right menu">
        <Link to="/" className="item active">
          Home
        </Link>
        <Link to="/register" className="item">
          Register
        </Link>
        <Link to="/login" className="item">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
