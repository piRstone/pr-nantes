import './marker.css'

import { RealTimeParkAndRide } from '../../types/RealTimeParkAndRide'

type Props = {
  realTimeParkAndRide: RealTimeParkAndRide
  onClick: (e: React.MouseEvent<HTMLElement>) => void
}

function Marker({ realTimeParkAndRide, onClick }: Props) {
  const availableSpots = realTimeParkAndRide.availableSpots
  let count = `${realTimeParkAndRide.availableSpots}`
  const status = realTimeParkAndRide.status
  let className = `marker ${availableSpots === 0 ? 'danger' : availableSpots < 10 ? 'warning' : ''}`

  if (status === 0) {
    className += ' invalid'
    count = 'X'
  } else if (status === 1) {
    className = 'marker danger'
    count = 'X'
  }

  return (
    <div onClick={onClick} className={className}>
      {count}
    </div>
  )
}

export default Marker
