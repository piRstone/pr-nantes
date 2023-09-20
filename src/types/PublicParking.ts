type LatLon = {
  lat: number
  lon: number
}

export type RealTimeParkingFields = {
  grp_complet: boolean
  grp_identifiant: string
  disponibilite: number
  grp_nom: string
  location: LatLon | null
  grp_status: number
  idobj: string
  grp_exploitation: number
  grp_horodatage: string
  grp_disponible: number
}

export type RealTimePublicParkingResponse = {
  total_count: number
  results: Array<RealTimeParkingFields>
}

export type RealTimePublicParking = {
  id: string
  name: string
  nbSpots: number
  availableSpots: number
  location: [number, number] | null
  totalSpots: number
  status: number
  timestamp: Date
}
