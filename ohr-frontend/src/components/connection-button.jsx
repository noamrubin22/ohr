import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useEffect } from 'react';
import Landing from './landing-view';
import Recording from './recording-view';
import ear from "../accets/ohr2.png";

const ConnectionButton = () => {
  const wallet = useWallet();
  return (
      <div className="flex justify-center	">
        <WalletMultiButton className="wallet-button glowing-border" />
      </div>
  )
}

export default ConnectionButton;