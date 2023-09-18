import { RealTimeParkAndRide, RealTimeParkAndRideResponse } from '../types/RealTimeParkAndRide'

export const realTimeParkAndRideApiToModel = (
  response: RealTimeParkAndRideResponse
): Array<RealTimeParkAndRide> => {
  return response.records.map((park) => ({
    id: park.fields.idobj,
    name: park.fields.grp_nom,
    nbSpots: park.fields.disponibilite,
    availableSpots: park.fields.grp_disponible,
    totalSpots: park.fields.grp_exploitation,
    geometry: park.geometry,
    status: park.fields.grp_status,
    timestamp: new Date(park.record_timestamp),
  }))
}
