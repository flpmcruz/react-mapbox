import React from 'react'
import ReactDOM from 'react-dom/client'
import mapboxgl from 'mapbox-gl';  
import { MapsApp } from './MapsApp'

if (!navigator.geolocation) {
  alert('Geolocation not supported')
  throw new Error('Geolocation not supported')
}

mapboxgl.accessToken = import.meta.env.VITE_MAP_TOKEN

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>,
)
