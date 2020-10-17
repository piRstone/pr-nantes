import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useContext,
} from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";
import "./Map.css";

import { AppDataContext } from "./dataProvider";
import Header from "./components/Header";
import Marker from "./components/Marker";
import Popup from "./components/Popup";

function Map() {
  const { appData, setAppData } = useContext(AppDataContext);

  const [map, setMap] = useState(null);
  const [data, setData] = useState([]);
  const [allParks, setAllParks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [popupData, setPopupData] = useState(undefined);
  const [showPopup, setShowPopup] = useState(false);

  const mapContainer = useRef();

  // Init
  useEffect(() => {
    console.log(navigator.platform);
    const initMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-1.5543, 47.2107],
        zoom: 10,
      });

      map.on("load", () => {
        setMap(map);
        map.resize();
        map.dragRotate.disable();

        // Load and declare park symbol
        map.loadImage(
          process.env.PUBLIC_URL + "/img/parking-symbol@3x.png",
          (error, image) => {
            if (error) throw error;
            map.addImage("parking-symbol", image);
          }
        );

        // Handle parks symbols clicks
        map.on("click", "all-parks", handleParkSymbolClick);
      });
    };

    const storedShowAllParks = localStorage.getItem("showAllParks");
    if (storedShowAllParks) {
      const val = storedShowAllParks === "true" ? true : false;
      setAppData({ showAllParks: val });
    }

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

  // Display real time data on map
  useEffect(() => {
    if (map && data.length) {
      data.forEach((point) => {
        if (point.fields?.location) {
          const places = point.fields.grp_disponible;

          const el = document.createElement("div");
          el.className = `marker ${
            places === 0 ? "danger" : places < 10 ? "warning" : ""
          }`;
          el.innerText = places;

          const markerNode = document.createElement("div");
          ReactDOM.render(
            <Marker data={point} onClick={handlePointClick} />,
            markerNode
          );

          const location = point.fields.location;

          new mapboxgl.Marker({ element: markerNode })
            .setLngLat([location[1], location[0]])
            .addTo(map);
        }
      });
    }
  }, [map, data, handlePointClick]);

  // Display all parks on map
  useEffect(() => {
    if (map && allParks.length) {
      let source = {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      };

      allParks.forEach((point) => {
        if (point.fields?.location) {
          const location = point.fields.location;
          const coordinates = [location[1], location[0]];

          const feature = {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates,
            },
            properties: {
              name: point.fields.nom_complet,
              ...point.fields,
            },
          };

          source.data.features.push(feature);
        }
      });

      if (!map.getSource("all-parks-source")) {
        map.addSource("all-parks-source", source);
        map.addLayer({
          id: "all-parks",
          type: "symbol",
          source: "all-parks-source",
          layout: {
            "icon-image": "parking-symbol",
            "icon-size": 0.25,
          },
        });

        // Set visibility according to user choice
        const visibility = appData.showAllParks === true ? "visible" : "none";
        map.setLayoutProperty("all-parks", "visibility", visibility);
      }
    }
  }, [map, allParks, appData]);

  const getData = () => {
    setIsLoading(true);

    // Get all parks of Nantes
    const allParksUrl =
      "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_parcs-relais-nantes-metropole&q=&rows=100&facet=libtype&facet=commune&facet=service_velo&facet=autres_service_mob_prox&facet=conditions_d_acces&facet=exploitant";

    fetch(allParksUrl)
      .then((res) => res.json())
      .then(
        (result) => {
          setAllParks(result.records);
        },
        (error) => {
          console.log("Error: ", error);
        }
      );

    // Get parks with real time places numbers
    const realTimeUrl =
      "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_parcs-relais-nantes-metropole-disponibilites&q=&rows=30&facet=grp_nom&facet=grp_statut";

    fetch(realTimeUrl)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoading(false);
          setData(result.records);
        },
        (error) => {
          setIsLoading(false);
          console.log("Error: ", error);
        }
      );
  };

  const toggleAllParks = () => {
    const visibility = map.getLayoutProperty("all-parks", "visibility");
    map.setLayoutProperty(
      "all-parks",
      "visibility",
      visibility === "none" ? "visible" : "none"
    );
    const show = visibility === "none" ? true : false;
    localStorage.setItem("showAllParks", show);
    setAppData({ showAllParks: show });
  };

  const handleParkSymbolClick = (e) => {
    console.log(e);
    console.log(e.features[0]);
  };

  return (
    <div className="Map">
      <div ref={mapContainer} className="mapContainer" />
      <Header
        data={data}
        onRefresh={getData}
        onToggleAllParks={toggleAllParks}
        isLoading={isLoading}
      />
      <Popup
        data={popupData}
        visible={showPopup}
        onClick={() => setShowPopup(false)}
      />
    </div>
  );
}

export default Map;
