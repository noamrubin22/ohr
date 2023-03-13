import Timer from "../components/timer";

function WelcomeText({ isConnected, recording, recUrl }) {
  return (
    <div className="welcome-container">
      <h1 className="title">capture the moment, in sound</h1>
      <div className="landing-text">
        {!isConnected ? (
          <div className="subtitle">
            <h2>hear, record & mint your audio NFT</h2>
          </div>
        ) : (
          <Timer recording={recording} recUrl={recUrl} />
        )}
      </div>
    </div>
  );
}

export default WelcomeText;
