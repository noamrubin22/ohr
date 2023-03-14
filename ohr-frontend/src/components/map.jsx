import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useRef, useState, useEffect } from "react";
import { clsx } from "clsx";
import earIcon from "../assets/ohr2.png";

const Map = ({ style }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(1.25);

  mapboxgl.accessToken =
    "pk.eyJ1Ijoibm9hbWllMjIiLCJhIjoiY2xmMmoxZjYwMGowdjN5cG5vMXJzY2J4eCJ9.R1-JKFMkvmsuDf7Mk-CoNg";

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return <div ref={mapContainer} className={clsx(style, "m-box")} />;
};

export default Map;

// const Map = ({ style }) => {
//   const mapContainer = useRef(null);
//   const map = useRef(null);
//   const [lng, setLng] = useState(-70.9);
//   const [lat, setLat] = useState(42.35);
//   const [zoom, setZoom] = useState(1.25);

//   mapboxgl.accessToken = "your-access-token";

//   useEffect(() => {
//     if (map.current) return;
//     map.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: "mapbox://styles/mapbox/dark-v10",
//       center: [lng, lat],
//       zoom: zoom,
//     });

//     // Add user-location icon to map
//     map.current.loadImage(earIcon, function (error, image) {
//       if (error) throw error;
//       map.current.addImage("user-location", image);
//     });
//   }, []);

//   useEffect(() => {
//     if (!map.current) return;
//     map.current.on("move", () => {
//       setLng(map.current.getCenter().lng.toFixed(4));
//       setLat(map.current.getCenter().lat.toFixed(4));
//       setZoom(map.current.getZoom().toFixed(2));
//     });
//   });

//   const getUserLocation = () => {
//     navigator.geolocation.getCurrentPosition((position) => {
//       const { latitude, longitude } = position.coords;
//       map.current.setCenter([longitude, latitude]);
//       map.current.setZoom(15);
//     });
//   };

//   return (
//     <div ref={mapContainer} className={clsx(style, "m-box")}>
//       <button onClick={getUserLocation}>Find My Location</button>
//     </div>
//   );
// };

// export default Map;
