import ear from "../accets/ohr2.png";
import UpperNav from "./upper-nav";
import BottomNav from "./bottom-nav";
import Landing from "./landing-view";
import Recording from "./recording-view";
import VisualisationAndCoords from "./visualisation-view";
import Map from "./map";
import { useState } from "react";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import WelcomeText from "./welcome-text";

const LandingPage = () => {
  const wallet = useWallet();

  const [visualisationView, setVisualisationView] = useState(false);
  const [blob, setBlob] = useState(null);

  const handleRec = (audioBlob) => {
    setBlob(audioBlob);
  };

  return (
    <div className="grad">
      <UpperNav />
      <WelcomeText />
      <div className="central-outer-container">
        {!wallet.publicKey ? (
          <Landing ear={ear} />
        ) : !visualisationView ? (
          <Recording
            ear={ear}
            setVisualisationView={setVisualisationView}
            onRecorded={handleRec}
          />
        ) : (
          <VisualisationAndCoords
            setVisualisationView={setVisualisationView}
            blob={blob}
          />
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default LandingPage;
