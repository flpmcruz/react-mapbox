import { useContext } from "react"
import { BiCurrentLocation } from "react-icons/bi"
import { MapContext, PlacesContext } from "../context"

export const BtnMyLocation = () => {

    const { map, isMapReady } = useContext(MapContext)
    const { userLocation } = useContext(PlacesContext)

    const onClick = () => {
        if (!isMapReady) throw new Error("Map is not ready")
        if (!userLocation) throw new Error("User location is not ready")

        // map?.setCenter(userLocation) // This is the same as the next line
        map?.flyTo({ center: userLocation })
    }

    return (
        <button
            className="btn btn-primary"
            onClick={onClick}
        >
            <BiCurrentLocation />
        </button>
    )
}
