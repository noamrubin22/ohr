import React, { useState } from "react";
import Timer from "./timer";

// for now it's working on click (no holding)
// it stops automaticaly after 10 sec
const Recording = ({ ear, onRecorded, setView }) => {
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
    }, 7000);
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
    setView("map");
    setDidRecord(false);
  };

  return (
    <>
      <div className="central-inner-container">
        <Timer recording={recording} recUrl={recUrl} />
        <div className="recording-container">
          <button
            className={didRecord ? "huge-ear" : "huge-ear rec"}
            disabled={didRecord}
            onClick={startRecording}
          >
            <img src={ear} alt="Ear recording button" />
          </button>
          <div>
            <p className="text">press the ear to record a sound</p>
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
