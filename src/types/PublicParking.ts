export type StringBoolean = 'OUI' | 'NON' | null

export type PublicParkingResponse = {
  idobj: string
  nom_complet: string
  libcategorie: string | null
  libtype: string | null
  commune: string
  adresse: string
  telephone: string | null
  site_web: string | null
  code_postal: string
  location: [string, string]
  presentation: string
  capacite_voiture: number
  acces_pmr: StringBoolean
  capacite_pmr: number
  capacite_vehicule_electrique: number | null
  capacite_moto: number | null
  capacite_velo: number | null
  service_velo: StringBoolean
  stationnement_velo: StringBoolean
  stationnement_velo_securise: StringBoolean
  acces_transports_communs: string
  moyen_paiement: string
  conditions_d_acces: string | null
  exploitant: string | string
  infos_complementaires: string
}
