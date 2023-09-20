import './popup.css'

import { faDirections } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import React from 'react'

import { ParkAndRide } from '../../types/ParkAndRide'
import { RealTimePublicParking } from '../../types/PublicParking'
import { RealTimeParkAndRide } from '../../types/RealTimeParkAndRide'
import FreeParkRidePopup from './FreeParkRide'
import RealTimeParkRidePopup from './RealTimeParkRide'
import RealTimePublicParkingPopup from './RealTimePublicParking'

export type PopupDataType = {
  parkAndRide?: ParkAndRide
  realTimeParkAndRide?: RealTimeParkAndRide
  realTimePublicParking?: RealTimePublicParking
}

type Props = {
  data?: PopupDataType
  visible: boolean
  onClick: () => void
}

function Popup({ data, visible, onClick }: Props) {
  if (!data) return <div className="popup"></div>

  const wrapperClassName = `popup ${visible ? 'visible' : ''}`
  const navigationButClassName = `navigation-button ${visible ? 'visible' : ''}`

  const handleNavigationClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation() // Prevent closing popup

    let location: [number, number] | undefined
    if (data.parkAndRide !== undefined) {
      const coordinates = data.parkAndRide.geometry.coordinates
      location = [coordinates[1], coordinates[0]]
    } else if (data.realTimeParkAndRide !== undefined) {
      const coordinates = data.realTimeParkAndRide.geometry.coordinates
      location = [coordinates[1], coordinates[0]]
    } else if (data.realTimePublicParking?.location) {
      location = data.realTimePublicParking!.location!
    }
    if (location) {
      startNavigation(location[0], location[1])
    }
  }

  const startNavigation = (lat: number, lng: number) => {
    if (lat && lng) {
      window.open(`https://maps.google.com/maps?daddr=${lat},${lng}&amp;ll=`)
    }
  }

  return (
    <div className={wrapperClassName} onClick={onClick}>
      <div className={navigationButClassName} onClick={handleNavigationClick}>
        <FontAwesomeIcon icon={faDirections} color="rgb(28, 57, 223)" />
        <span>Y aller</span>
      </div>
      {data?.realTimeParkAndRide && <RealTimeParkRidePopup data={data.realTimeParkAndRide} />}
      {data?.realTimePublicParking && (
        <RealTimePublicParkingPopup data={data.realTimePublicParking} />
      )}
      {data?.parkAndRide && <FreeParkRidePopup data={data.parkAndRide} />}
    </div>
  )
}

Popup.propTypes = {
  data: PropTypes.object,
  visible: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Popup
