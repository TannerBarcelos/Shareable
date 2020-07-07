import React from 'react';
import PropTypes from 'prop-types';

const ProfileMain = ({
  profile: {
    bio,
    location,
    social,
    user: {name, avatar},
  },
}) => {
  return (
    <div className="card">
      <div className="image">
        <img src={avatar} />
        <div className="content">
          <div className="header">{name}</div>
          <div className="meta">
            <p>Location: {location && <span>{location}</span>}</p>
          </div>
        </div>
      </div>
      <div className="description">
        <p>
          <i class="far fa-address-card"></i>
          {bio}
        </p>
        {social && social.twitter && (
          <a href={social.twitter} target="blank" rel="noopener noreferrer">
            <i class="fab fa-twitter"></i>
          </a>
        )}
        {social && social.instagram && (
          <a href={social.instagram} target="blank" rel="noopener noreferrer">
            <i class="fab fa-instagram"></i>
          </a>
        )}
        {social && social.facebook && (
          <a href={social.facebook} target="blank" rel="noopener noreferrer">
            <i class="fab fa-facebook"></i>
          </a>
        )}
        {social && social.linkedin && (
          <a href={social.linkedin} target="blank" rel="noopener noreferrer">
            <i class="fab fa-linkedin"></i>
          </a>
        )}
        {social && social.youtube && (
          <a href={social.youtube} target="blank" rel="noopener noreferrer">
            <i class="fab fa-youtube"></i>
          </a>
        )}
      </div>
    </div>
  );
};

ProfileMain.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileMain;
