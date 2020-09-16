import React, { useEffect, useState, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import './App.css';

import Header from './components/Header';
import Marker from './components/Marker';
import Popup from './components/Popup';

function App() {
  const [map, setMap] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [popupData, setPopupData] = useState(undefined);
  const [showPopup, setShowPopup] = useState(false);

  const mapContainer = useRef();

  // Init
  useEffect(() => {
    const initMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-1.5543, 47.2107],
        zoom: 10,
      });

      map.on('load', () => {
        setMap(map);
        map.resize();
      });
    };

    if (!map) initMap({ setMap, mapContainer });

    getData();
  }, []);

  const handlePointClick = useCallback(
    (point) => {
      if (popupData && popupData.fields.idobj === point.fields.idobj) {
        setShowPopup(false);

        // Clear data after animation
        setTimeout(() => {
          setPopupData(undefined);
        }, 300);
        return;
      }

      setPopupData(point);
      setShowPopup(true);
    },
    [popupData]
  );

  // Display points on map
  useEffect(() => {
    if (map && data.length) {
      data.forEach((point) => {
        if (point.geometry) {
          const places = point.fields.grp_disponible;

          const el = document.createElement('div');
          el.className = `marker ${
            places === 0 ? 'danger' : places < 10 ? 'warning' : ''
          }`;
          el.innerText = places;

          const markerNode = document.createElement('div');
          ReactDOM.render(<Marker data={point} onClick={handlePointClick} />, markerNode);

          new mapboxgl.Marker({ element: markerNode })
            .setLngLat(point.geometry.coordinates)
            .addTo(map);
        }
      });
    }
  }, [map, data, handlePointClick]);

  const getData = () => {
    const url =
      'https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_parcs-relais-nantes-metropole-disponibilites&q=&rows=30&facet=grp_nom&facet=grp_statut';

    setIsLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoading(false);
          setData(result.records);
        },
        (error) => {
          setIsLoading(false);
          console.log('Error: ', error);
        }
      );
  };

  return (
    <div className="App">
      <div ref={mapContainer} className="mapContainer" />
      <Header data={data} refresh={getData} isLoading={isLoading} />
      <Popup
        data={popupData}
        visible={showPopup}
        onClick={() => setShowPopup(false)}
      />
    </div>
  );
}

export default App;
