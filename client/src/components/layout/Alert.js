import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// this component will get the alerts in our store from the register stage and display them
const Alert = ({alerts}) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div key={alert.id} className="ui red message">
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

// get the alert state from our store (in root reducer where we combine reducers (use the reducer from the key))
const mapStateToProps = (state) => {
  return {
    alerts: state.alert,
  };
};

export default connect(mapStateToProps)(Alert);
