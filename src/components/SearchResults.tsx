import { useContext, useState } from "react"
import { MapContext, PlacesContext } from "../context"
import { Feature } from "../interfaces/placesResponse"

export const SearchResults = () => {
    const { isLoadingPlaces, places, userLocation } = useContext(PlacesContext)
    const { map, getRouteBetweenPoints } = useContext(MapContext)

    const [selectedPlace, setSelectedPlace] = useState('')

    if (isLoadingPlaces) return (
        <div className="alert alert-primary mt-2">Loading....
        </div>
    )

    if (places.length === 0) return <></>

    const onPlaceClick = (place: Feature) => {
        setSelectedPlace(place.id)
        const [lng, lat] = place.center
        map?.flyTo({
            center: [lng, lat],
            zoom: 14
        })
    }

    const getRoute = (place: Feature) => {
        if (!userLocation) return
        const [lng, lat] = place.center
        getRouteBetweenPoints(userLocation, [lng, lat])
    }

    return (
        <ul className="list-group mt-3">
            {
                places.map(place => (
                    <li
                        key={place.id}
                        className={`pointer ${selectedPlace === place.id ? 'active text-white' : ''} list-group-item list-group-item-action}`}
                        onClick={() => onPlaceClick(place)}
                    >
                        <h6>{place.text_es}</h6>
                        <p
                            className={`${selectedPlace === place.id ? 'text-white' : ''}`}
                            style={{
                                fontSize: '0.8rem'
                            }}
                        >
                            {place.text}
                        </p>
                        <button
                            onClick={() => getRoute(place)}
                            className={`btn btn-sm ${selectedPlace === place.id ? 'btn-primary border-white' : 'btn-outline-primary'}`}
                        >
                            Direcciones
                        </button>
                    </li>
                ))
            }
        </ul>
    )
}
