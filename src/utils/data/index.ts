import { parkAndRideApiToModel } from "../../dtos/parkAndRides";
import { realTimeParkAndRideApiToModel } from "../../dtos/realTimeParkAndRides";
import { ParkAndRide, ParkAndRideResponse } from "../../types/ParkAndRide";
import {
  RealTimeParkAndRide,
  RealTimeParkAndRideResponse,
} from "../../types/RealTimeParkAndRide";

export const getAllParks = async (): Promise<Array<ParkAndRide>> => {
  const allParksUrl =
    "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_parcs-relais-nantes-metropole&q=&rows=100&facet=libtype&facet=commune&facet=service_velo&facet=autres_service_mob_prox&facet=conditions_d_acces&facet=exploitant";

  try {
    const response = await fetch(allParksUrl);
    const rawParks = (await response.json()) as ParkAndRideResponse;
    const parks = parkAndRideApiToModel(rawParks);
    return parks;
  } catch (e) {
    console.log("Error while retrieving all parks", e);
    throw e;
  }
};

export const getRealTimeParks = async (): Promise<
  Array<RealTimeParkAndRide>
> => {
  const realTimeUrl =
    "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_parcs-relais-nantes-metropole-disponibilites&q=&rows=30&facet=grp_nom&facet=grp_statut";

  try {
    const response = await fetch(realTimeUrl);
    const rawParks = (await response.json()) as RealTimeParkAndRideResponse;
    const parks = realTimeParkAndRideApiToModel(rawParks);
    return parks;
  } catch (e) {
    console.log("Error while retrieving real time parks", e);
    throw e;
  }
};
