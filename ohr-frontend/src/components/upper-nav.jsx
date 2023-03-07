import ConnectionButton from "./connection-button";

function UpperNav({ setConnected }) {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">my NFT's</a>
            </div>
            <div className="flex-none gap-2">
                <div className="dropdown dropdown-end">
                        <ConnectionButton className="btn btn-active" setConnected={setConnected} />
                </div>
            </div>
        </div>
    )
}

export default UpperNav;