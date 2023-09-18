import { Point } from 'geojson'

type PkgFields = {
  long_wgs84: number
  lat_wgs84: number
  exploitant: string
  location: [string, string]
  capacite_vehicule_electrique: number
  code_postal: string
  stationnement_velo: string
  nom_complet: string
  capacite_velo: number
  libtype: string
  capacite_voiture: number
  services: string
  presentation: string
  capacite_pmr: number
  stationnement_velo_securise: string
  idobj: string
  autres_service_mob_prox: string
  commune: string
  capacite_moto: number
  adresse: string
  conditions_d_acces: string
}

type PkgRecord = {
  fields: PkgFields
  geometry: Point
  record_timestamp: string
}

export type ParkAndRideResponse = {
  records: Array<PkgRecord>
}

export type ParkAndRide = {
  id: string
  name: string
  totalSpots: number
  geometry: Point
  timestamp: Date
}
