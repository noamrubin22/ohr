import ear from "../accets/ohr2.png";
import UpperNav from "./upper-nav";
import BottomNav from "./bottom-nav";
import Landing from "./landing-view";
import Recording from "./recording-view";

import { useConnection, useWallet, } from '@solana/wallet-adapter-react';

const LandingPage = () => {
  const wallet = useWallet();
  return (
    <div>
      <UpperNav />
         <div className="central-outer-container">
           {!wallet.publicKey ?
             <Landing ear={ear} />
             :
             <Recording ear={ear} />}
         </div>
         <BottomNav />
      </div>
  )
}

export default LandingPage;