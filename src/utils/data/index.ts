import { parkAndRideApiToModel } from '../../dtos/parkAndRides'
import { realTimeParkAndRideApiToModel } from '../../dtos/realTimeParkAndRides'
import { realTimePublicParkingApiToModel } from '../../dtos/realTimePublicParking'
import { ParkAndRide, ParkAndRideResponse } from '../../types/ParkAndRide'
import { RealTimePublicParking, RealTimePublicParkingResponse } from '../../types/PublicParking'
import { RealTimeParkAndRide, RealTimeParkAndRideResponse } from '../../types/RealTimeParkAndRide'

export const getAllParks = async (): Promise<Record<string, ParkAndRide>> => {
  const url =
    'https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_parcs-relais-nantes-metropole&q=&rows=100&facet=libtype&facet=commune&facet=service_velo&facet=autres_service_mob_prox&facet=conditions_d_acces&facet=exploitant'

  try {
    const response = await fetch(url)
    const rawParks = (await response.json()) as ParkAndRideResponse
    const parks = parkAndRideApiToModel(rawParks)
    return parks
  } catch (e) {
    console.log('Error while retrieving all parks', e)
    throw e
  }
}

export const getRealTimeParks = async (): Promise<Array<RealTimeParkAndRide>> => {
  const url =
    'https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_parcs-relais-nantes-metropole-disponibilites&q=&rows=30&facet=grp_nom&facet=grp_statut'

  try {
    const response = await fetch(url)
    const rawParkings = (await response.json()) as RealTimeParkAndRideResponse
    const parkings = realTimeParkAndRideApiToModel(rawParkings)
    return parkings
  } catch (e) {
    console.log('Error while retrieving real time park and ride', e)
    throw e
  }
}

export const getRealTimePublicParkings = async (): Promise<Array<RealTimePublicParking>> => {
  const url =
    'https://data.nantesmetropole.fr/api/explore/v2.1/catalog/datasets/244400404_parkings-publics-nantes-disponibilites/records?limit=100'

  try {
    const response = await fetch(url)
    const rawParkings = (await response.json()) as RealTimePublicParkingResponse
    const parkings = realTimePublicParkingApiToModel(rawParkings)
    return parkings
  } catch (e) {
    console.log('Error while retrieving real time public parkings', e)
    throw e
  }
}
