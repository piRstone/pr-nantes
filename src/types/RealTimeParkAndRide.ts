import { Point } from 'geojson'

type PkgFields = {
  grp_complet: boolean
  grp_identifiant: string
  disponibilite: number
  grp_nom: string
  location: [string, string]
  grp_statut: number
  idobj: string
  grp_exploitation: number
  grp_horodatage: string
  grp_disponible: number
}

type PkgRecord = {
  fields: PkgFields
  geometry: Point
  record_timestamp: string
}

export type RealTimeParkAndRideResponse = {
  records: Array<PkgRecord>
}

export type RealTimeParkAndRide = {
  id: string
  name: string
  nbSpots: number
  availableSpots: number
  totalSpots: number
  geometry: Point
  status: number
  timestamp: Date
}
