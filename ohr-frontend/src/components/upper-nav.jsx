import ConnectionButton from "./connection-button";
import HomeBtn from "./home-btn";

function UpperNav({ setView }) {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <HomeBtn setView={setView} />
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
