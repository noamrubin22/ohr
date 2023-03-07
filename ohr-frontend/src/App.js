import './App.css';
import ear from './accets/logo2.png';
import avatar from './accets/avatar.png';
import UpperNav from './components/UpperNav.jsx';
import BottomNav from './components/BottomNav.jsx';
import Landing from './components/Landing';
import Recording from './components/Recording';

import { useMemo } from 'react';
import { clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  GlowWalletAdapter,
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

//for button
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useConnection, useWallet, } from '@solana/wallet-adapter-react';

import { setVisible } from '@solana/wallet-adapter-react-ui';
import ConnectionButton from "./components/connection-button"
require('@solana/wallet-adapter-react-ui/styles.css');


function App() {
  // you can use Mainnet, Devnet or Testnet here
  const solNetwork = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(solNetwork), [solNetwork]);

  // initialise all the wallets you want to use
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new GlowWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ solNetwork }),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
      new SolletExtensionWalletAdapter(),
      new SolletWalletAdapter(),
    ],
    [solNetwork]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} >
        <WalletModalProvider>
          <div className="App">
            <UpperNav avatar={avatar} />

            {/* when not logged in: */}
            {/* <Landing ear={ear} /> */}

            {/* when logged in */}
            <Recording ear={ear} />

            {/* here is connection button!!!!! */}
            <ConnectionButton className="btn btn-active"/>

            <BottomNav />
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;