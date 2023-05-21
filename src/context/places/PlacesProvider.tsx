import { useEffect, useReducer } from "react";

import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./placesReducer";
import { getUserLocation } from "../../helpers";
import { searhcApi } from "../../apis";
import { Feature, PlacesResponse } from "../../interfaces/placesResponse";

export interface PlacesState {
  isLoading: boolean;
  userLocation?: [number, number];
  isLoadingPlaces: boolean;
  places: Feature[];
}

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined,
  isLoadingPlaces: false,
  places: [],
};

interface Props { children: JSX.Element | JSX.Element[] }

export const PlacesProvider = ({ children }: Props) => {

  const [state, dispach] = useReducer(placesReducer, INITIAL_STATE)

  useEffect(() => {
    getUserLocation()
      .then((lnglat) =>
        dispach({ type: "setUserLocation", payload: lnglat }))
      .catch((err) => console.log(err))
  }, [])

  const searchPlacesByTerm = async (query: string): Promise<Feature[]> => {
    if (!state.userLocation) throw new Error('No se ha encontrado la ubicación del usuario')

    if (query.length === 0) {
      dispach({ type: 'setPlaces', payload: [] })
      return []
    }

    dispach({ type: 'setLoadingPlaces' })

    const resp = await searhcApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: `${state.userLocation.join(',')}`,
      }
    })

    dispach({ type: 'setPlaces', payload: resp.data.features })
    return resp.data.features
  }

  return (
    <PlacesContext.Provider value={{
      ...state,

      // Actions
      searchPlacesByTerm
    }}>
      {children}
    </PlacesContext.Provider>
  )
}
