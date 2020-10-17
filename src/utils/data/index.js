export const getAllParks = async () => {
  const allParksUrl =
    "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_parcs-relais-nantes-metropole&q=&rows=100&facet=libtype&facet=commune&facet=service_velo&facet=autres_service_mob_prox&facet=conditions_d_acces&facet=exploitant";

  try {
    const response = await fetch(allParksUrl);
    const data = await response.json();
    return data.records;
  } catch (e) {
    throw Error(e);
  }
};

export const getRealTimeParks = async () => {
  const realTimeUrl =
    "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_parcs-relais-nantes-metropole-disponibilites&q=&rows=30&facet=grp_nom&facet=grp_statut";

  try {
    const response = await fetch(realTimeUrl);
    const data = await response.json();
    return data.records;
  } catch (e) {
    throw Error(e);
  }
};
