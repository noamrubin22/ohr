import Map from "./map";

function MapView({ setView }) {
  return (
    <div className="central-inner-container">
      <h1 className="subtitle">do you want to add your location?</h1>
      <div className="map-view-container">{/* <Map /> */}</div>
      <button className="btn" onClick={() => setView("visual")}></button>
    </div>
  );
}

export default MapView;
