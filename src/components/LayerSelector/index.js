import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import "./style.css";

import { AppDataContext } from "../../dataProvider";

const LayerSelector = ({ onToggleAllParks }) => {
  const [showPopup, setShowPopup] = useState(false);
  const { appData } = useContext(AppDataContext);

  return (
    <div className="layer-selector">
      <div className="layer-button" onClick={() => setShowPopup(!showPopup)}>
        <FontAwesomeIcon icon={faLayerGroup} className="layer-icon" size="lg" />
      </div>
      {showPopup && (
        <div className="layer-popup">
          <div>
            <input
              id="toggle-all-parks"
              type="checkbox"
              checked={appData.showAllParks}
              onChange={onToggleAllParks}
            />
            <label htmlFor="toggle-all-parks">
              Afficher tous les parkings relais
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default LayerSelector;
