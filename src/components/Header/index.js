import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import './header.css';

import { AppDataContext } from '../../dataProvider';
import LayerSelector from '../LayerSelector';

function Header({ data, onRefresh, onToggleAllParks, isLoading }) {
  const [timestamp, setTimestamp] = useState(undefined);

  const { setAppData } = useContext(AppDataContext);

  // Set last sync time
  useEffect(() => {
    if (data.length) {
      const ts = data[0].record_timestamp;
      const date = new Date(ts);

      const hours = date.getHours();
      let minutes = date.getMinutes();
      minutes = minutes < 10 ? `0${minutes}` : minutes;

      setTimestamp(`${hours}h${minutes}`);
      setAppData({ count: data.length });
    }
  }, [data]);

  return (
    <div className="header-wrapper">
      <header>
        <h1 className="header-title">P+R Nantes</h1>
        <p className="header-version">v1.1.0</p>
      </header>
      {timestamp && (
        <div className="header-timestamp-wrapper">
          <p>Mis à jour aujourd'hui à {timestamp}</p>
          <button
            type="button"
            onClick={onRefresh}
            className="header-refresh-button"
          >
            <FontAwesomeIcon
              icon={faRedoAlt}
              color="#616161"
              spin={isLoading}
            />
          </button>
        </div>
      )}
      <LayerSelector onToggleAllParks={onToggleAllParks} />
    </div>
  );
}

Header.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  onRefresh: PropTypes.func.isRequired,
  onToggleAllParks: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Header;
