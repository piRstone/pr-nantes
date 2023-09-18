import './style.css'

import { faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useRef, useState } from 'react'

import { AppDataContext } from '../../dataProvider'
import { useOnClickOutside } from '../../hooks'

type Props = {
  onToggleAllParks: () => void
}

const LayerSelector = ({ onToggleAllParks }: Props) => {
  const [showPopup, setShowPopup] = useState(false)
  const { appData } = useContext(AppDataContext)

  const popupRef = useRef(null)
  useOnClickOutside(popupRef, () => {
    setShowPopup(false)
  })

  return (
    <div ref={popupRef} className="layer-selector">
      <div className="layer-button" onClick={() => setShowPopup(!showPopup)}>
        <FontAwesomeIcon icon={faLayerGroup} className="layer-icon" size="lg" />
      </div>
      {showPopup && (
        <div className="layer-popup">
          <div className="layer-row">
            <input
              id="toggle-all-parks"
              className="layer-input"
              type="checkbox"
              checked={appData.showAllParks}
              onChange={onToggleAllParks}
            />
            <label htmlFor="toggle-all-parks" className="layer-label">
              Afficher tous les parkings relais
            </label>
          </div>
        </div>
      )}
    </div>
  )
}

export default LayerSelector
