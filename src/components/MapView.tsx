import { useContext, useLayoutEffect, useRef } from "react"
import { Map } from "mapbox-gl"

import { MapContext, PlacesContext } from "../context"
import { Loading } from "."

export const MapView = () => {
    const { isLoading, userLocation } = useContext(PlacesContext)
    const { setMap } = useContext(MapContext)

    const mapDiv = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        if (!isLoading) {
            const map = new Map({
                container: mapDiv.current!, // container ID
                style: `mapbox://styles/mapbox/streets-v12`,
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
