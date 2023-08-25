import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDirections } from "@fortawesome/free-solid-svg-icons";
import "./popup.css";

import RealTimeParkRidePopup from "./RealTimeParkRide";
import FreeParkRidePopup from "./FreeParkRide";
import { RealTimeParkAndRide } from "../../types/RealTimeParkAndRide";
import { ParkAndRide } from "../../types/ParkAndRide";

export type PopupDataType = {
  park: ParkAndRide | RealTimeParkAndRide;
  type: "ParkAndRide" | "RealTimeParkAndRide";
};

type Props = {
  data?: PopupDataType;
  visible: boolean;
  onClick: () => void;
};

function Popup({ data, visible, onClick }: Props) {
  if (!data) return <div className="popup"></div>;

  const wrapperClassName = `popup ${visible ? "visible" : ""}`;
  const navigationButClassName = `navigation-button ${
    visible ? "visible" : ""
  }`;

  const handleNavigationClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation(); // Prevent closing popup

    const coordinates = data.park.geometry.coordinates
    if (coordinates) {
      startNavigation(coordinates[1], coordinates[0]);
    }
  };

  const startNavigation = (lat: number, lng: number) => {
    if (!lat || !lng) {
      window.open(`https://maps.google.com/maps?daddr=${lat},${lng}&amp;ll=`);
    }
  };

  return (
    <div className={wrapperClassName} onClick={onClick}>
      <div className={navigationButClassName} onClick={handleNavigationClick}>
        <FontAwesomeIcon icon={faDirections} color="rgb(28, 57, 223)" />
        <span>Y aller</span>
      </div>
      {data?.type === "RealTimeParkAndRide" && (
        <RealTimeParkRidePopup data={data.park as RealTimeParkAndRide} />
      )}
      {data?.type === "ParkAndRide" && (
        <FreeParkRidePopup data={data.park as ParkAndRide} />
      )}
    </div>
  );
}

Popup.propTypes = {
  data: PropTypes.object,
  visible: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Popup;
