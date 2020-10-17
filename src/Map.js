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
import Popup, { popupTypes } from "./components/Popup";
import { getAllParks, getRealTimeParks } from "./utils/data";

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
      if (popupData) {
        const idobj = popupData.data.fields
          ? popupData.data.fields.idobj
          : popupData.data.properties.idobj;
        if (idobj === point.fields.idobj) {
          setShowPopup(false);

          // Clear data after animation
          setTimeout(() => {
            setPopupData(undefined);
          }, 300);
          return;
        }
      }

      setPopupData({ type: popupTypes.realTimeParkRide, data: point });
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

  const getData = async () => {
    setIsLoading(true);

    // Get all parks of Nantes
    try {
      const allParks = await getAllParks();
      setAllParks(allParks);
    } catch (e) {
      console.error(e);
    }

    // Get parks with real time places numbers
    try {
      const realTimeParks = await getRealTimeParks();
      setData(realTimeParks);
    } catch (e) {
      console.error(e);
    }

    setIsLoading(false);
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

    const point = e.features[0];

    if (popupData) {
      const idobj = popupData.data.fields
        ? popupData.data.fields.idobj
        : popupData.data.properties.idobj;
      if (idobj === point.properties.idobj) {
        setShowPopup(false);

        // Clear data after animation
        setTimeout(() => {
          setPopupData(undefined);
        }, 300);
        return;
      }
    }

    setPopupData({ type: popupTypes.freeParkRide, data: point });
    setShowPopup(true);
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
