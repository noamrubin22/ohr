import Map from "./map";

function MapView({ setView }) {
  return (
    <div className="central-inner-container">
      <div className="map-view-container">
        <h1 className="subtitle" style={{ marginBottom: "1rem" }}>
          do you want to add your location?
        </h1>
        <div>
          <Map class={"map-container-flow"} />
        </div>
        <div>
          <button className="btn" onClick={() => setView("visual")}>
            yes
          </button>
          <button className="btn" onClick={() => setView("visual")}>
            no
          </button>
        </div>
      </div>
    </div>
  );
}

export default MapView;
