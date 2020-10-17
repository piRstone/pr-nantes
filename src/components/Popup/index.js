import React from 'react';
import PropTypes from 'prop-types';
import './popup.css';

import RealTimeParkRidePopup from './RealTimeParkRide';
import FreeParkRidePopup from './FreeParkRide';

export const popupTypes = {
  realTimeParkRide: 'realTime',
  freeParkRide: 'freeParkRide',
};

function Popup({ data, visible, onClick }) {
  if (!data) return <div className="popup"></div>;

  const wrapperClassName = `popup ${visible ? 'visible' : ''}`;

  return (
    <div className={wrapperClassName} onClick={onClick}>
      {data.type === popupTypes.realTimeParkRide && (
        <RealTimeParkRidePopup data={data.data} />
      )}
      {data.type === popupTypes.freeParkRide && <FreeParkRidePopup data={data.data} />}
    </div>
  );
}

Popup.propTypes = {
  data: PropTypes.object,
  visible: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Popup;
