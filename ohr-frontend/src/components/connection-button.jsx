import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useEffect } from 'react';

const ConnectionButton = ({ setConnected }) => {

    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const wallet = useWallet();

    useEffect(() => {
        setConnected(wallet.connected);
    }, [wallet.connected, setConnected]);

    return (
        <div className="flex justify-center	">
            <WalletMultiButton className="wallet-button " />
        </div>
    )
}

export default ConnectionButton;