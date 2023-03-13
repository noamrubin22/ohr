import React, { useEffect, useState } from "react";
import Map, { GeolocateControl, Marker } from "react-map-gl";
import ear from "../assets/ohr2.png";

const GeoMap = ({ style }) => {
  const [currentCoordinates, setCurrentCoordinates] = useState();

  const accessToken =
    "pk.eyJ1Ijoibm9hbWllMjIiLCJhIjoiY2xmMmoxZjYwMGowdjN5cG5vMXJzY2J4eCJ9.R1-JKFMkvmsuDf7Mk-CoNg";

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentCoordinates(position.coords);
        console.log("current location", position.coords);
      });
    }
  }, []);

  return (
    <div className={style}>
      {currentCoordinates && (
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
      )}
    </div>
  );
};

export default GeoMap;
