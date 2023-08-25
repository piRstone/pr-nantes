import { ParkAndRide, ParkAndRideResponse } from '../types/ParkAndRide';

export const parkAndRideApiToModel = (response: ParkAndRideResponse): Array<ParkAndRide> => {
  return response.records.map((park) => ({
    id: park.fields.idobj,
    name: park.fields.nom_complet,
    totalSpots: park.fields.capacite_voiture,
    geometry: park.geometry,
    timestamp: new Date(park.record_timestamp),
  }))
}
