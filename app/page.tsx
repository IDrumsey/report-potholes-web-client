"use client"

import styles from "./_home.module.scss"

import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api"
import { useState, useCallback, useEffect } from "react"

export default function Home() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
  })

  const [map, mapSetter] = useState<google.maps.Map | null>()

  const onMapLoad = useCallback(function callback(map: google.maps.Map) {
    mapSetter(map)
  }, [])

  const onMapUnmount = useCallback(function callback(map: google.maps.Map) {
    mapSetter(null)
  }, [])

  const [potholeCoords, potholeCoordsSetter] =
    useState<google.maps.LatLngLiteral | null>()

  const [initialMapCenter, initialMapCenterSetter] =
    useState<google.maps.LatLngLiteral | null>()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        potholeCoordsSetter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        initialMapCenterSetter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      },
      null,
      { enableHighAccuracy: true }
    )
  }, [])

  const onMapClick = (mouseEvent: google.maps.MapMouseEvent) => {
    if (mouseEvent.latLng) {
      potholeCoordsSetter(mouseEvent.latLng.toJSON())
    }
  }

  return (
    <main className="min-h-screen bg-white px-16 py-10">
      <div className="w-full lg:grid lg:grid-cols-2 lg:gap-4 flex flex-col gap-0 items-stretch">
        <div>
          <h1 className="text-left text-7xl font-bold text-[#00A3FF]">
            Report a
          </h1>
          <h1 className="pl-8 text-8xl mt-6 font-bold text-[#252525]">
            Pothole
          </h1>
        </div>
        <div className="p-4">
          {isLoaded && initialMapCenter && potholeCoords && (
            <>
              <GoogleMap
                center={initialMapCenter}
                zoom={17}
                mapContainerClassName="map-container"
                onLoad={onMapLoad}
                onUnmount={onMapUnmount}
                onClick={onMapClick}
              >
                <Marker position={potholeCoords} />
              </GoogleMap>
              {potholeCoords && (
                <p className="text-right text-sm my-5 text-black">{`${potholeCoords.lat} ${potholeCoords.lng}`}</p>
              )}
              <div
                id={styles["report-button"]}
                className="ml-auto py-5 px-16 bg-white shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] hover:shadow-[0_4px_4px_0_rgba(0,0,0,0.5)] transition-shadow border-solid border-[#F1F1F1] border-1 rounded-md cursor-pointer"
              >
                <p className="text-[#00A3FF] font-bold text-2xl">Report</p>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  )
}
