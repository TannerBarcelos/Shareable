import React from 'react';
import {Link} from 'react-router-dom';
import landingIMG from '../../img/landing_img.png';

const btn_box = {
  margin: '0 20px 0 20px',
};

const Landing = () => {
  return (
    <div style={{margin: '30vh auto', textAlign: 'center', padding: '20px'}}>
      <h3 style={{fontSize: '4rem'}}>Shareable</h3>
      <p style={{fontSize: '1.5rem'}}>A social network</p>
      <Link
        to="/register"
        className="item"
        className="ui green button"
        style={btn_box}
      >
        Register
      </Link>
      <Link
        to="/login"
        className="item"
        className="ui blue button"
        style={btn_box}
      >
        Login
      </Link>
    </div>
  );
};

export default Landing;
