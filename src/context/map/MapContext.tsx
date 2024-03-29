import { createContext } from 'react';
import { Map } from 'mapbox-gl';

interface MapContextProps {
  isMapReady: boolean;
  map?: Map,

  // Actions
  setMap: (map: Map) => void
  getRouteBetweenPoints: (start: [number, number], end: [number, number]) => Promise<void>
  updateStyle: (style: string) => void
}

export const MapContext = createContext<MapContextProps>({} as MapContextProps);