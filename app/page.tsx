"use client"

import { GoogleMap, useJsApiLoader } from "@react-google-maps/api"
import { useState, useCallback } from "react"

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

  return (
    <main className="min-h-screen">
      <div className="w-full lg:grid lg:grid-cols-2 lg:gap-4 flex flex-col gap-0 items-stretch">
        <div className="p-10 pl-20">
          <h1 className="text-left text-7xl font-bold text-[#00A3FF]">
            Report a
          </h1>
          <h1 className="pl-20 text-8xl mt-6 font-bold text-[#252525]">
            Pothole
          </h1>
        </div>
        <div className="p-4">
          {isLoaded && (
            <GoogleMap
              center={{ lat: 40.676786247456214, lng: -73.96008350857923 }}
              zoom={17}
              mapContainerClassName="map-container"
              onLoad={onMapLoad}
              onUnmount={onMapUnmount}
            />
          )}
        </div>
      </div>
    </main>
  )
}
