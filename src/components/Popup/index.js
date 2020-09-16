import React from 'react';
import PropTypes from 'prop-types';
import './popup.css';

function Popup({ data, visible, onClick }) {
  if (!data) return <div className="popup-wrapper"></div>;

  const { grp_nom, grp_disponible, grp_exploitation } = data.fields;

  const wrapperClassName = `popup-wrapper ${visible ? 'visible' : ''}`;

  const countClassName = `popup-count ${
    grp_disponible === 0 ? 'danger' : grp_disponible < 10 ? 'warning' : ''
  }`;

  let countSentence;
  if (grp_disponible === 0) {
    countSentence = 'Aucune place disponible';
  } else if (grp_disponible === 1) {
    countSentence = '1 place disponible';
  } else {
    countSentence = `${grp_disponible} places disponibles`;
  }

  return (
    <div className={wrapperClassName} onClick={onClick}>
      <div className={countClassName}>{grp_disponible}</div>
      <div className="popup-informations">
        <h3 className="popup-park-name">{grp_nom}</h3>
        <p className="">{countSentence}</p>
        <p>
          Nombre de places totales : <strong>{grp_exploitation}</strong>
        </p>
      </div>
    </div>
  );
}

Popup.propTypes = {
  data: PropTypes.object,
  visible: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Popup;
