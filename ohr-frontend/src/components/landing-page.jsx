import ear from "../assets/ohr2.png";
import UpperNav from "./upper-nav";
import BottomNav from "./bottom-nav";
import Landing from "./landing-view";
import Recording from "./recording-view";
import VisualisationAndCoords from "./visualisation-view";
import { useState, useEffect } from "react";

import { useWallet } from "@solana/wallet-adapter-react";
import WelcomeText from "./welcome-text";
import MapView from "./map-view";

const LandingPage = () => {
  const wallet = useWallet();

  const [view, setView] = useState("");
  const [blob, setBlob] = useState(null);

  const handleRec = (audioBlob) => {
    setBlob(audioBlob);
  };

  let componentToRender;

  useEffect(() => {
    wallet.publicKey &&
      view !== "map" &&
      view !== "visual" &&
      setView("recording");
  }, [wallet.publicKey, view]);

  switch (view) {
    case "recording":
      componentToRender = (
        <Recording ear={ear} onRecorded={handleRec} setView={setView} />
      );
      break;
    case "map":
      componentToRender = <MapView blob={blob} setView={setView} />;
      break;
    case "visual":
      componentToRender = (
        <VisualisationAndCoords blob={blob} setView={setView} />
      );
      break;
    default:
      componentToRender = <Landing ear={ear} />;
      break;
  }

  return (
    <div className="grad">
      <UpperNav setView={setView} />
      {wallet.publicKey ? (
        <div className="central-outer-container">
          <div>{componentToRender}</div>
          <div>{!wallet.publicKey && <WelcomeText />}</div>
        </div>
      ) : (
        <div className="central-outer-container">
          <Landing ear={ear} />
          <div>{!wallet.publicKey && <WelcomeText />}</div>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default LandingPage;
