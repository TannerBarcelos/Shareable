import React from 'react';
import {Link} from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div>
      <Link to="/edit-profile" className="ui purple button">
        <i className="fas fa-user" />
        Edit Profile
      </Link>
    </div>
  );
};

export default DashboardActions;
