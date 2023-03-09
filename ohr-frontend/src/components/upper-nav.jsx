import ConnectionButton from "./connection-button";

import { useConnection, useWallet } from '@solana/wallet-adapter-react';

function UpperNav({ setConnected }) {
    const wallet = useWallet();
    //console.log(wallet, "upper nav?")
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