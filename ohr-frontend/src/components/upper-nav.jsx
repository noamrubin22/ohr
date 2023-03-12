import ConnectionButton from "./connection-button";

function UpperNav({ setMap, map }) {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl" onClick={() => {setMap(!map)}}>NFTs map</a>
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