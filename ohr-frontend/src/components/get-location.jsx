import { useState } from "react";

const GetLocation = ({x, y, xx, yy}) => {

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
            {xx && yy ? <p>Your location is: {xx}, {yy}</p> : null}
            <button className="btn" onClick={getLocation}>+ location</button>
        </div>
    );
}

export default GetLocation;