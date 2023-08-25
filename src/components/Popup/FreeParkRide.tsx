import { ParkAndRide } from "../../types/ParkAndRide";

type Props = {
  data: { properties: ParkAndRide};
};

const FreeParkRidePopup = ({ data }: Props) => {
  console.info("INFO", data);
  const { name, totalSpots } = data.properties;

  return (
    <div className="popup-wrapper">
      <img src="/img/parking-symbol@2x.png" alt="Parking icon" />
      <div className="popup-informations">
        <h3 className="popup-park-name">{name}</h3>
        <p>
          Nombre de places totales : <strong>{totalSpots}</strong>
        </p>
      </div>
    </div>
  );
};

export default FreeParkRidePopup;
