import React, { useEffect, useState } from "react";
import Map, { GeolocateControl, Marker } from "react-map-gl";

function MapView({ setView }) {
  const [currentCoordinates, setCurrentCoordinates] = useState();
  const accessToken = process.env.MAPBOX_ACCESS_TOKEN;

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentCoordinates(position.coords);
        console.log("current location", position.coords);
      });
    }
  }, []);
  return (
    <div className="central-inner-container">
      <div className="map-view-container">
        {currentCoordinates ? (
          <>
            <h1 className="subtitle-location">
              do you want to add your location?
            </h1>
            <div className="map-container-flow">
              <Map
                mapboxAccessToken={accessToken}
                mapStyle={`mapbox://styles/mapbox/dark-v9`}
                initialViewState={{
                  longitude: currentCoordinates?.longitude,
                  latitude: currentCoordinates?.latitude,
                  zoom: 10,
                }}
              >
                <GeolocateControl
                  positionOptions={{ enableHighAccuracy: true }}
                  fitBoundsOptions={{ maxZoom: 12 }}
                  trackUserLocation={true}
                  showAccuracyCircle={true}
                  showUserLocation={true}
                />
                {/* <Marker
                  longitude={currentCoordinates.longitude}
                  latitude={currentCoordinates.latitude}
                >
                  <img src={ear} alt={"Ear logo"} width="40px" height="60px" />
                </Marker> */}
              </Map>
            </div>
            <div>
              <div className="map-btns">
                <button
                  className="btn btn-ghost big"
                  onClick={() =>
                    setView("visual") && console.log(currentCoordinates)
                  }
                >
                  yes
                </button>
                <button
                  className="btn btn-ghost big"
                  onClick={() => setView("visual")}
                >
                  no
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="loader">
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MapView;
