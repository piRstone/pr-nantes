import React from 'react';
import PropTypes from 'prop-types';
import './marker.css';

function Marker({ data, onClick }) {
  const count = data.fields.grp_disponible;
  const className = `marker ${
    count === 0 ? 'danger' : count < 10 ? 'warning' : ''
  }`;

  return <div onClick={() => onClick(data)} className={className}>{count}</div>;
}

Marker.propTypes = {
  data: PropTypes.object,
  onClick: PropTypes.func.isRequired
}

export default Marker;
