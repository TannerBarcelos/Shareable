import React from 'react';
import {Link} from 'react-router-dom';
import landingIMG from '../../img/landing_img.png';

const btn_box = {
  margin: '0 20px 0 20px',
};

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
        <img src={landingIMG} alt="landing" style={{marginBottom: '20px'}} />
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
    </div>
  );
};

export default Landing;
