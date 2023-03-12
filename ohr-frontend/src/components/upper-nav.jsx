import { useEffect } from "react";
import ConnectionButton from "./connection-button";
import Map from "./map";

function UpperNav() {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <label htmlFor="my-modal-4" className="btn btn-ghost normal-case text-xl">NFT map</label>
                <input type="checkbox" id="my-modal-4" className="modal-toggle" />
                <label htmlFor="my-modal-4" className="modal cursor-pointer">
                    <label className="relative" htmlFor="">
                        <Map />
                    </label>
                </label>
            </div>
            <div className="flex-none gap-2">
                <div className="dropdown dropdown-end">
                    <ConnectionButton className="btn btn-active" />
                </div>
            </div>
        </div>
    )
}

export default UpperNav;