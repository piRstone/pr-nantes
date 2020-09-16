import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import './header.css';

function Header({ data, refresh, isLoading }) {
  const [timestamp, setTimestamp] = useState(undefined);

  // Set last sync time
  useEffect(() => {
    if (data.length) {
      const ts = data[0].record_timestamp;
      const date = new Date(ts);

      const hours = date.getHours();
      let minutes = date.getMinutes();
      minutes = minutes < 10 ? `0${minutes}` : minutes;

      setTimestamp(`${hours}h${minutes}`);
    }
  }, [data]);

  return (
    <div className="header-wrapper">
      <header>
        <h1 className="header-title">P+R Nantes</h1>
        <p className="header-version">v1.0.0</p>
      </header>
      {timestamp && (
        <div className="header-timestamp-wrapper">
          <p>Mis à jour aujourd'hui à {timestamp}</p>
          <button
            type="button"
            onClick={refresh}
            className="header-refresh-button"
          >
            <FontAwesomeIcon icon={faRedoAlt} color="#616161" spin={isLoading} />
          </button>
        </div>
      )}
    </div>
  );
}

Header.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  refresh: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
}

export default Header;
