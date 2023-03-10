import ear from "../accets/ohr2.png";
import UpperNav from "./upper-nav";
import BottomNav from "./bottom-nav";
import Landing from "./landing-view";
import Recording from "./recording-view";
import Visualisation from "./visualisation-view";
import { useState } from "react";

import { useConnection, useWallet, } from '@solana/wallet-adapter-react';

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
			<div className="central-outer-container">
				{!wallet.publicKey
					? <Landing ear={ear} />
					: !visualisationView
						? <Recording ear={ear} setVisualisationView={setVisualisationView} onRecorded={handleRec}/>
						: <Visualisation setVisualisationView={setVisualisationView} blob={blob}/>}
			</div>
			<BottomNav />
		</div>
	)
}

export default LandingPage;