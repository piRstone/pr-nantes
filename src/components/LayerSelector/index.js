import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';

import './style.css';

const LayerSelector = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="layer-selector">
      <div className="layer-button" onClick={() => setShowPopup(!showPopup)}>
        <FontAwesomeIcon icon={faLayerGroup} className="layer-icon" size="lg" />
      </div>
      {showPopup && (
        <div className="layer-popup">
          Popup
        </div>
      )}
    </div>
  );
}

export default LayerSelector;
