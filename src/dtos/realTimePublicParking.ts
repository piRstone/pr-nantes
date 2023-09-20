import { RealTimePublicParking, RealTimePublicParkingResponse } from '../types/PublicParking'

export const realTimePublicParkingApiToModel = (
  response: RealTimePublicParkingResponse
): Array<RealTimePublicParking> => {
  return response.results.map((park) => ({
    id: park.idobj,
    name: park.grp_nom,
    nbSpots: park.disponibilite,
    availableSpots: park.grp_disponible,
    totalSpots: park.grp_exploitation,
    location: park.location ? [park.location.lon, park.location.lat] : null,
    status: park.grp_status,
    timestamp: new Date(park.grp_horodatage),
  }))
}
