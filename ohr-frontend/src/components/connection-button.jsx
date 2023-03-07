import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

const ConnectionButton = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    
    return (
    	<div className="flex justify-center	">
            <WalletMultiButton className="wallet-button"/>
        </div>
    )
}

export default ConnectionButton;