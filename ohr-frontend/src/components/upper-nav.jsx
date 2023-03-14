import ConnectionButton from "./connection-button";
import Map from "./map";
import HomeBtn from "./home-btn";

function UpperNav({ setView }) {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <HomeBtn setView={setView} />
        <input type="checkbox" id="my-modal-5" className="modal-toggle" />
        <label htmlFor="my-modal-5" className="modal cursor-pointer">
          <label className="relative" htmlFor="">
            <Map style={"map-container"} />
          </label>
        </label>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <ConnectionButton className="btn btn-active" />
        </div>
      </div>
    </div>
  );
}

export default UpperNav;
