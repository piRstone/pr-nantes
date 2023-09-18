import "./Map.css";

import { Feature } from 'geojson';
import mapboxgl, { AnySourceData } from "mapbox-gl";
import { useCallback, useContext,useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";

import Header from "./components/Header";
import Marker from "./components/Marker";
import Popup, { PopupDataType } from "./components/Popup";
import { AppDataContext } from "./dataProvider";
import propertiesToPoint, { PointProperties } from './dtos/propertiesToPoint';
import { ParkAndRide } from "./types/ParkAndRide";
import { RealTimeParkAndRide } from "./types/RealTimeParkAndRide";
import { getAllParks, getRealTimeParks } from "./utils/data";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY;

function Map() {
  const { appData, setAppData } = useContext(AppDataContext);

  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [data, setData] = useState<Array<RealTimeParkAndRide>>([]);
  const [allParks, setAllParks] = useState<Record<string, ParkAndRide>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [popupData, setPopupData] = useState<PopupDataType | undefined>(
    undefined
  );
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const mapContainer = useRef<HTMLElement | null>(null);

  // Init
  useEffect(() => {
    if (!mapContainer.current) return;
    const initMap = ({
      setMap,
      mapContainer,
    }: {
      setMap: React.Dispatch<React.SetStateAction<mapboxgl.Map | null>>;
      mapContainer: React.RefObject<HTMLElement | null>;
    }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current!,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-1.5543, 47.2107],
        zoom: 10,
      });

      map.on("load", () => {
        setMap(map);
        map.resize();
        map.dragRotate.disable();
        map.touchZoomRotate.disableRotation();

        // Load and declare park symbol
        map.loadImage("/img/parking-symbol@3x.png", (error, image) => {
          if (error) throw error;
          map.addImage("parking-symbol", image!);
        });

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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePointClick = useCallback(
    (point: RealTimeParkAndRide, e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      if (popupData) {
        const idobj = popupData.park.id;
        if (idobj === point.id) {
          setShowPopup(false);

          // Clear data after animation
          setTimeout(() => {
            setPopupData(undefined);
          }, 300);
          return;
        }
      }

      setPopupData({ park: point, type: "RealTimeParkAndRide" });
      setShowPopup(true);
    },
    [popupData]
  );

  // Display real time data on map
  useEffect(() => {
    if (map && data.length) {
      data.forEach((park) => {
        if (park.geometry) {
          const spots = park.availableSpots;

          const el = document.createElement("div");
          el.className = `marker ${
            spots === 0 ? "danger" : spots < 10 ? "warning" : ""
          }`;
          el.innerText = `${spots}`;

          const markerNode = document.createElement("div");
          const root = createRoot(markerNode);
          root.render(
            <Marker
              realTimeParkAndRide={park}
              onClick={(e: React.MouseEvent<HTMLElement>) =>
                handlePointClick(park, e)
              }
            />
          );

          new mapboxgl.Marker({ element: markerNode })
            .setLngLat([
              park.geometry.coordinates[0],
              park.geometry.coordinates[1],
            ])
            .addTo(map);
        }
      });
    }
  }, [map, data, handlePointClick]);

  // Display all parks on map
  useEffect(() => {
    if (map && Object.keys(allParks).length) {
      const source: AnySourceData = {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: Object.values(allParks).map((park) => {
            const coordinates = park.geometry.coordinates;

            const feature: Feature = {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates,
              },
              properties: park,
            };

            return feature;
          }),
        },
      };

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
    if (map) {
      const visibility = map.getLayoutProperty("all-parks", "visibility");
      map.setLayoutProperty(
        "all-parks",
        "visibility",
        visibility === "none" ? "visible" : "none"
      );
      const show = visibility === "none" ? true : false;
      localStorage.setItem("showAllParks", show ? "true" : "false");
      setAppData({ showAllParks: show });
    }
  };

  const handleParkSymbolClick = useCallback(
    (e: mapboxgl.MapMouseEvent & {
    features?: mapboxgl.MapboxGeoJSONFeature[] | undefined;
} & mapboxgl.EventData) => {
      const point = e.features![0];

      if (popupData) {
        const idobj = popupData.park.id;
        if (point.properties !== null) {

          if (idobj === point.properties.id) {
            setShowPopup(false);

            // Clear data after animation
            setTimeout(() => {
              setPopupData(undefined);
            }, 300);
            return;
          }

          const park = propertiesToPoint(point.properties as PointProperties);

          setPopupData({ park, type: "ParkAndRide" });
          setShowPopup(true);
        }
      }
    },
    [popupData]
  );

  return (
    <div className="Map">
      <div ref={mapContainer as React.LegacyRef<HTMLDivElement> | undefined} className="mapContainer" />
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
