import { useContext, useLayoutEffect, useRef } from "react"
import { Map } from "mapbox-gl"

import { MapContext, PlacesContext } from "../context"
import { Loading } from "."

export const MapView = () => {
    const { isLoading, userLocation } = useContext(PlacesContext)
    const { setMap } = useContext(MapContext)

    const mapDiv = useRef<HTMLDivElement>(null)

    const mapStyles: string[] = ['streets-v12', 'light-v10', 'dark-v10', 'streets-v11', 'outdoors-v11', 'satellite-v9', 'satellite-streets-v11', 'navigation-day-v1', 'navigation-night-v1']

    useLayoutEffect(() => {
        if (!isLoading) {
            const map = new Map({
                container: mapDiv.current!, // container ID
                style: `mapbox://styles/mapbox/${mapStyles[0]}`,
                center: userLocation, // starting position [lng, lat]
                zoom: 14, // starting zoom
            });
            setMap(map) // set map to context to use in other components
        }
    }, [isLoading])

    if (isLoading) return (<Loading />)

    return (
        <div
            ref={mapDiv}
            style={{
                width: "100vw",
                height: "100vh",
                position: "fixed",
                top: 0,
                left: 0,
            }}
        >
        </div>
    )
}
