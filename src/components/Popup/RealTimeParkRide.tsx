import { RealTimeParkAndRide } from '../../types/RealTimeParkAndRide'

type Props = {
  data: RealTimeParkAndRide
}

const RealTimeParkRidePopup = ({ data }: Props) => {
  const { name, availableSpots, totalSpots, status } = data
  let count = `${availableSpots}`

  let countClassName = `popup-count ${
    availableSpots === 0 ? 'danger' : availableSpots < 10 ? 'warning' : ''
  }`

  let countSentence
  if (availableSpots === 0) {
    countSentence = 'Aucune place disponible'
  } else if (availableSpots === 1) {
    countSentence = '1 place disponible'
  } else {
    countSentence = `${count} places disponibles`
  }

  if (status === 0) {
    countSentence = 'Comptage hors service'
    count = 'X'
    countClassName += ' invalid'
  } else if (status === 1) {
    countSentence = 'Parking fermé'
    count = 'X'
    countClassName = 'popup-count danger'
  }

  return (
    <div className="popup-wrapper">
      <div className={countClassName}>{count}</div>
      <div className="popup-informations">
        <h3 className="popup-park-name">{name}</h3>
        <p className="">{countSentence}</p>
        <p>
          Nombre de places totales : <strong>{totalSpots}</strong>
        </p>
      </div>
    </div>
  )
}

export default RealTimeParkRidePopup
