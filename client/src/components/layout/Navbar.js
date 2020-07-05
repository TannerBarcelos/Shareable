import React from 'react';
import {Link} from 'react-router-dom';

const localStyleLogo = {
  width: '5rem',
  height: '5rem',
  fontSize: '3rem',
  borderRadius: '50%',
  padding: '10px',
};

const Navbar = () => {
  return (
    <div className="ui secondary menu">
      <i class="far fa-handshake" style={localStyleLogo}></i>
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
