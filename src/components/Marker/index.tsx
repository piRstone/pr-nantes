import './marker.css'

import classNames from 'classnames'

import { RealTimePublicParking } from '../../types/PublicParking'
import { RealTimeParkAndRide } from '../../types/RealTimeParkAndRide'

type Props = {
  parking: RealTimeParkAndRide | RealTimePublicParking
  type: 'ParkAndRide' | 'PublicParking'
  onClick: (e: React.MouseEvent<HTMLElement>) => void
}

function Marker({ parking, type, onClick }: Props) {
  const availableSpots = parking.availableSpots
  let count = `${parking.availableSpots}`
  const status = parking.status
  const className = classNames('marker', {
    warning: availableSpots < 10 && availableSpots > 0,
    danger: status === 1 || availableSpots === 0,
    invalid: status === 0,
    'park-ride': type === 'ParkAndRide',
    'public-park': type === 'PublicParking',
  })

  if (status === 0 || status === 1) {
    count = 'X'
  }

  return (
    <div onClick={onClick} className={className}>
      {count}
    </div>
  )
}

export default Marker
