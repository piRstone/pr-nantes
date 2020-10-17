import React from 'react';
import PropTypes from 'prop-types';

const RealTimeParkRidePopup = ({ data }) => {
  const { grp_nom, grp_disponible, grp_exploitation, grp_statut } = data.fields;
  let count = grp_disponible;

  let countClassName = `popup-count ${
    count === 0 ? 'danger' : count < 10 ? 'warning' : ''
  }`;

  let countSentence;
  if (count === 0) {
    countSentence = 'Aucune place disponible';
  } else if (count === 1) {
    countSentence = '1 place disponible';
  } else {
    countSentence = `${count} places disponibles`;
  }

  if (grp_statut === 0) {
    countSentence = 'Comptage hors service';
    count = 'X';
    countClassName += ' invalid';
  } else if (grp_statut === 1) {
    countSentence = 'Parking fermé';
    count = 'X';
    countClassName = 'popup-count danger';
  }

  return (
    <div className="popup-wrapper">
      <div className={countClassName}>{count}</div>
      <div className="popup-informations">
        <h3 className="popup-park-name">{grp_nom}</h3>
        <p className="">{countSentence}</p>
        <p>
          Nombre de places totales : <strong>{grp_exploitation}</strong>
        </p>
      </div>
    </div>
  );
};

RealTimeParkRidePopup.propTypes = {
  data: PropTypes.object.isRequired,
};

export default RealTimeParkRidePopup;
