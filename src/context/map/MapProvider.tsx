import { useReducer, useContext, useEffect } from 'react';
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from "mapbox-gl";

import { MapContext } from "./MapContext";
import { mapReducer } from "./mapReducer";
import { PlacesContext } from '..';
import { directionsApi } from '../../apis';
import { DirectionsResponse } from '../../interfaces/directions';

export interface MapState {
  isMapReady: boolean;
  map?: Map;
  markers?: Marker[];
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
  markers: [],
};

interface Props { children: JSX.Element | JSX.Element[] }

export const MapProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);

  const { places } = useContext(PlacesContext)

  useEffect(() => {
    state.markers?.forEach((marker) => marker.remove()); // Remove all markers
    const newMarkers: Marker[] = [];

    // Add new markers
    for (const place of places) {
      const [lng, lat] = place.center;
      const popup = new Popup().setHTML(
        `<h3>${place.text_es}</h3>
        <p>${place.place_name_es}</p>`
      );
      const newMarker = new Marker({ color: "#61DBFB" })
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(state.map!);

      newMarkers.push(newMarker);
    }

    // Update state
    dispatch({ type: "setMarkers", payload: newMarkers });
    limpiarPolylines() // Limpiar polylines

  }, [places])

  const setMap = (map: Map) => {
    const myLocationPopup = new Popup({ offset: 25 }).setHTML(
      `<h4>My Location</h4>`
    );

    // Add marker
    new Marker({ color: "#61DBFB" })
      .setLngLat(map.getCenter())
      .setPopup(myLocationPopup)
      .addTo(map);

    dispatch({ type: "setMap", payload: map });
  };

  const limpiarPolylines = () => {
    if (state.map?.getLayer("RouteString")) {
      state.map?.removeLayer("RouteString")
      state.map?.removeSource("RouteString")
    }
  }

  const getRouteBetweenPoints = async (start: [number, number], end: [number, number]) => {
    const resp = await directionsApi.get<DirectionsResponse>(`/${start.join(",")};${end.join(",")}`)

    const { distance, duration, geometry } = resp.data.routes[0]
    const { coordinates: coords } = geometry

    // CALCULAR DISTANCIA Y DURACIÓN
    let kms = distance / 1000;
    kms = Math.round(kms * 100);
    kms /= 100;

    const minutes = Math.floor(duration / 60);
    console.log(`Distance: ${kms} kms, Duration: ${minutes} minutes`);
    // -----------------------------


    // DIBUJAR POLYLINE (RUTA)
    limpiarPolylines() // Limpiar polylines anterior

    const bounds = new LngLatBounds(start, end);

    for (const coord of coords) {
      const newCoord: [number, number] = [coord[0], coord[1]]
      bounds.extend(newCoord)
    }

    state.map?.fitBounds(bounds, { padding: 100 })

    const sourceData: AnySourceData = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: coords
            }
          }
        ]
      }
    }

    state.map?.addSource("RouteString", sourceData);
    state.map?.addLayer({
      id: "RouteString",
      type: "line",
      source: "RouteString",
      layout: {
        "line-join": "round",
        "line-cap": "round"
      },
      paint: {
        "line-color": "black",
        "line-width": 3
      }
    });
  }

  const updateStyle = (style: string) =>
    state.map?.setStyle(`mapbox://styles/mapbox/${style}`);

  return (
    <MapContext.Provider
      value={{
        ...state,

        // Actions
        setMap,
        getRouteBetweenPoints,
        updateStyle,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
