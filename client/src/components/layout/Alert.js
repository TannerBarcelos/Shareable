import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// this component will get the alerts in our store from the register stage and display them
const Alert = ({alerts}) => {
  if (alerts !== null && alerts.length > 0) {
    alerts.map((alert) => {
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
      </div>;
    });
  }
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

// get the alert state from our store (in root reducer where we combine reducers (use the reducer from the key))
const mapStateToProps = (state) => {
  alerts: state.alert;
};

export default connect(mapStateToProps)(Alert);
