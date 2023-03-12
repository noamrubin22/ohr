import { useState } from "react";

const GetLocation = ({ x, y, xx, yy }) => {

    // const [latitude, setLatitude] = useState(null);
    // const [longitude, setLongitude] = useState(null);

    function getLocation() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                function success(position) {
                    x(position.coords.latitude);
                    y(position.coords.longitude);
                },
                function error(error) {
                    console.error(error);
                }
            );
        } else {
            console.error("Geolocation is not supported");
        }
    }

    return (
        <div>

            {/* <button tabIndex={0} className="btn btn-ghost" onClick={getLocation}>+ location</button> */}

            <div className="dropdown dropdown-left dropdown-end">
                <button tabIndex={0} className="btn btn-ghost blue" onClick={getLocation}>+ location</button>
                {xx && yy ? <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li> {<p>Location {xx}, {yy} was added.</p>}</li>
                </ul> : null }


            </div>
        </div>
    );
}

export default GetLocation;