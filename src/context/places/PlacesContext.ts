import { createContext } from "react";
import { Feature } from "../../interfaces/placesResponse";

export interface PlacesContextProps {
  isLoading: boolean;
  userLocation?: [number, number];
  places: Feature[];
  isLoadingPlaces: boolean;

  // Actions
  searchPlacesByTerm: (query: string) => Promise<Feature[]>;
}

export const PlacesContext = createContext<PlacesContextProps>(
  {} as PlacesContextProps
);
