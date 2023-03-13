import { isWalletAdapterCompatibleStandardWallet } from "@solana/wallet-adapter-base";
import React, { useState } from "react";
import Timer from "./timer";

// for now it's working on click (no holding)
// it stops automaticaly after 10 sec
const Recording = ({ ear, setVisualisationView, onRecorded }) => {
  const [recording, setRecording] = useState(false);
  const [didRecord, setDidRecord] = useState(false);
  const [recUrl, setRecUrl] = useState(null);

  const startRecording = async () => {
    setRecording(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    if (navigator.getUserMedia) {
      console.log("RECORDING STARTED");
    }
    const mediaRecorder = new MediaRecorder(stream);
    const chunks = [];
    mediaRecorder.ondataavailable = function (e) {
      chunks.push(e.data);
    };
    mediaRecorder.onstop = async function (e) {
      console.log("RECORDING STOPPED");
      // BLOB
      const audioBlob = new Blob(chunks, { type: "audio/wav; codecs=0" });
      // URL
      const recUrl = URL.createObjectURL(audioBlob);

      onRecorded(audioBlob);
      setRecUrl(recUrl);
      setRecording(false);
      setDidRecord(true);
    };
    mediaRecorder.start();
    setTimeout(() => {
      mediaRecorder.stop();
    }, 3000);
  };

  const playMyOhrBaby = async () => {
    if (recUrl) {
      const audio = new Audio(recUrl);
      audio.play();
    }
  };

  const handleDiscard = () => {
    const confirmed = window.confirm(
      "Are you sure you want to discard your audio?"
    );
    if (confirmed) {
      setDidRecord(false);
      setRecUrl(null);
    }
  };

  const handleContinue = () => {
    setVisualisationView(true);
    setDidRecord(false);
  };

  return (
    <>
      <div className="central-inner-container">
        <Timer recording={recording} recUrl={recUrl} />
        <h1 className="app-title">øhr</h1>
        <h1 className="app-title-top">øhr</h1>
        <div className="recording-container">
          <button
            className={didRecord ? "huge-ear" : "huge-ear rec"}
            disabled={didRecord}
            onClick={startRecording}
          >
            <img src={ear} alt="Ear recording button" />
          </button>
          <div>
            <p className="text">press and hold the ear to record a sound</p>
          </div>
        </div>
      </div>
      {didRecord ? (
        <div className="btn-group btn-group-vertical grupped">
          <button className="btn" onClick={playMyOhrBaby}>
            play
          </button>
          <button className="btn" onClick={handleDiscard}>
            discard
          </button>
          <button className="btn" onClick={handleContinue}>
            continue
          </button>
        </div>
      ) : null}
    </>
  );
};

export default Recording;
