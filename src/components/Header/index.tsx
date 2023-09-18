import './header.css'

import { faRedoAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { format } from 'date-fns'
import { useMemo } from 'react'

import { RealTimeParkAndRide } from '../../types/RealTimeParkAndRide'
import LayerSelector from '../LayerSelector'

type Props = {
  data: Array<RealTimeParkAndRide>
  onRefresh: () => void
  onToggleAllParks: () => void
  isLoading: boolean
}

function Header({ data, onRefresh, onToggleAllParks, isLoading }: Props) {
  // Last sync time
  const timestamp = useMemo(() => (data.length ? format(data[0].timestamp, 'HH:mm') : ''), [data])

  return (
    <div className="header-wrapper">
      <header>
        <h1 className="header-title">P+R Nantes</h1>
        <p className="header-version">v2.0.0</p>
      </header>
      {timestamp && (
        <div className="header-timestamp-wrapper">
          <p>Mis à jour aujourd'hui à {timestamp}</p>
          <button type="button" onClick={onRefresh} className="header-refresh-button">
            <FontAwesomeIcon icon={faRedoAlt} color="#616161" spin={isLoading} />
          </button>
        </div>
      )}
      <LayerSelector onToggleAllParks={onToggleAllParks} />
    </div>
  )
}

export default Header
