import React from 'react';
import {Link} from 'react-router-dom';
import landingIMG from '../../img/landing_img.png';

const Landing = () => {
  return (
    <div
      className="ui container"
      style={{
        margin: '0 auto',
        width: '400px',
        textAlign: 'center',
        marginTop: '30vh',
      }}
    >
      <div>
        <img src={landingIMG} alt="landing" />
        <p>A social network for the simple ones</p>
        <Link to="/register" className="item" className="ui green button">
          Register
        </Link>
        <Link to="/login" className="item" className="ui blue button">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Landing;
