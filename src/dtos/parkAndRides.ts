import { ParkAndRide, ParkAndRideResponse } from "../types/ParkAndRide";

export const parkAndRideApiToModel = (
  response: ParkAndRideResponse
): Record<string, ParkAndRide> => {
  return response.records.reduce((acc, cur) => {
    return {
      ...acc,
      [cur.fields.idobj]: {
        id: cur.fields.idobj,
        name: cur.fields.nom_complet,
        totalSpots: cur.fields.capacite_voiture,
        geometry: cur.geometry,
        timestamp: new Date(cur.record_timestamp),
      },
    };
  }, {});
};
