import axios from "axios";

const directionsApi = axios.create({
    baseURL: "https://api.mapbox.com/directions/v5/mapbox/driving",
    params: {
        alternatives: false,
        language: "es",
        access_token: import.meta.env.VITE_MAP_TOKEN,
        geometries: "geojson",
        overview: "simplified",
        steps: false
    },
});

export default directionsApi;