import React, { useState, useContext, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import "./style.css";

import { useOnClickOutside } from '../../utils/hooks';
import { AppDataContext } from "../../dataProvider";

const LayerSelector = ({ onToggleAllParks }) => {
  const [showPopup, setShowPopup] = useState(false);
  const { appData } = useContext(AppDataContext);

  const popupRef = useRef();
  useOnClickOutside(popupRef, () => { setShowPopup(false) });

  return (
    <div ref={popupRef} className="layer-selector">
      <div className="layer-button" onClick={() => setShowPopup(!showPopup)}>
        <FontAwesomeIcon icon={faLayerGroup} className="layer-icon" size="lg" />
      </div>
      {showPopup && (
        <div className="layer-popup">
          <div className="layer-row">
            <input
              id="toggle-all-parks"
              className="layer-input"
              type="checkbox"
              checked={appData.showAllParks}
              onChange={onToggleAllParks}
            />
            <label htmlFor="toggle-all-parks" className="layer-label">
              Afficher tous les parkings relais
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default LayerSelector;
