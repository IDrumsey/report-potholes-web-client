"use client"

import styles from "./_home.module.scss"

import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api"
import axios from "axios"
import { useState, useCallback, useEffect } from "react"

const blueMarker = "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"

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

  async function onReportBtnClick(coords: google.maps.LatLngLiteral) {
    const response = await axios.post("/api/potholes", coords)

    if (response.status == 200) {
      alert("Pothole reported. Thanks!")

      // update the list to show the new reported pothole as red marker
      updateReportedPotholesList()

      // remove the blue marker
      potholeCoordsSetter(null)
    }
  }

  const [reportedPotholes, reportedPotholesSetter] = useState<Array<any>>([])

  const updateReportedPotholesList = useCallback(async () => {
    const response = await axios.get("/api/potholes?page=1")

    if (response.status == 200) {
      reportedPotholesSetter(response.data)
    }
  }, [])

  useEffect(() => {
    const initialLoadReportedPotholesDataHandler = async () => {
      updateReportedPotholesList()
    }
    initialLoadReportedPotholesDataHandler()
  }, [updateReportedPotholesList])

  return (
    <main className="min-h-screen bg-white md:px-16 md:py-10 p-7">
      <div className="w-full md:grid md:grid-cols-2 md:gap-4 flex flex-col gap-0 items-stretch">
        <div className="inline-block m-auto mb-5 md:block md:m-0">
          <h1
            id={styles["title-part-1"]}
            className="text-left font-bold text-[#00A3FF] inline-block md:block"
          >
            Report a
          </h1>
          <h1
            id={styles["title-part-2"]}
            className="pl-2 md:pl-8 md:mt-2 font-bold text-[#252525] inline-block md:block"
          >
            Pothole
          </h1>

          {potholeCoords == null && (
            <p className="text-[#252525]">
              Click on the map to report a pothole
            </p>
          )}
        </div>
        <div>
          {isLoaded && initialMapCenter && (
            <>
              <GoogleMap
                center={initialMapCenter}
                zoom={17}
                mapContainerClassName="map-container"
                onLoad={onMapLoad}
                onUnmount={onMapUnmount}
                onClick={onMapClick}
              >
                {potholeCoords && (
                  <Marker
                    position={potholeCoords}
                    icon={blueMarker}
                  />
                )}
                {reportedPotholes.map(
                  (reportedPothole, reportedPotholeIndex) => (
                    <Marker
                      key={reportedPotholeIndex}
                      position={{
                        lat: reportedPothole.location_lat,
                        lng: reportedPothole.location_lng,
                      }}
                    />
                  )
                )}
              </GoogleMap>
              {potholeCoords && (
                <>
                  <p className="text-right text-sm my-5 text-black">{`${potholeCoords.lat} ${potholeCoords.lng}`}</p>

                  <div
                    id={styles["report-button"]}
                    className="w-full max-w-md ml-auto py-5 px-16 bg-white shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] hover:shadow-[0_4px_4px_0_rgba(0,0,0,0.5)] transition-shadow border-solid border-[#F1F1F1] border-1 rounded-md cursor-pointer"
                    onClick={() => onReportBtnClick(potholeCoords)}
                  >
                    <p className="text-[#00A3FF] text-center font-bold text-2xl">
                      Report
                    </p>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  )
}
