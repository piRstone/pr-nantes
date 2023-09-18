import { ParkAndRide } from '../types/ParkAndRide'

export type PointProperties = {
  id: string
  name: string
  totalSpots: number
  geometry: string
  timestamp: string
}

const propertiesToPoint = (properties: PointProperties): ParkAndRide => {
  return {
    id: properties.id,
    name: properties.name,
    totalSpots: properties.totalSpots,
    geometry: JSON.parse(properties.geometry),
    timestamp: new Date(properties.timestamp),
  }
}

export default propertiesToPoint
