import './App.css';
import ear from './accets/logo2.png';

import UpperNav from './components/upper-nav.jsx';
import BottomNav from './components/bottom-nav.jsx';
import Landing from './components/landing-view';
import ConnectionButton from "./components/connection-button";
import Recording from './components/recording-view';
import { useMemo, useState } from 'react';
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

require('@solana/wallet-adapter-react-ui/styles.css');


function App() {
  // you can use Mainnet, Devnet or Testnet here
  const solNetwork = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(solNetwork), [solNetwork]);

  // to track the wallet connection (TO DO: check useRef as alternative)
  const [connected, setConnected] = useState(false);

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
            <UpperNav setConnected={setConnected} />

            {!connected ?
              <>
                <Landing ear={ear} />
                {/* <ConnectionButton className="btn btn-active" setConnected={setConnected} /> */}
              </> :
              <Recording ear={ear} />}

            <BottomNav />
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;