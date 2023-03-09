import { isWalletAdapterCompatibleStandardWallet } from '@solana/wallet-adapter-base';
import React, { useState } from 'react';

// for now it's working on click (no holding)
// it stops automaticaly after 10 sec
const Recording = ({ ear }) => {
    const [recording, setRecording] = useState(false);
    const [didRecord, setDidRecord] = useState(false);
    const [recUrl, setRecUrl] = useState(null);

    const startRecording = async () => {
        setRecording(true);
        // to request access to the user's mic
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        if (navigator.getUserMedia) {
            console.log("RECORDING STARTED");
        }
        // create mediaRecorder obj https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/MediaRecorder
        const mediaRecorder = new MediaRecorder(stream);
        // const recordedStream = mediaRecorder.stream;

        // https://udn.realityripple.com/docs/Web/API/MediaRecorder/dataavailable_event
        const chunks = [];
        mediaRecorder.ondataavailable = function (e) {
            chunks.push(e.data);
            // console.log("RECORDED DATA >>>>>>>> ", chunks);
        }
        mediaRecorder.onstop = function (e) {
            console.log("RECORDING STOPPED");
            const audioBlob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' });
            const recUrl = window.URL.createObjectURL(audioBlob);
            setRecUrl(recUrl);
            setRecording(false);
            setDidRecord(true);
        }
        mediaRecorder.start();

        setTimeout(() => {
            mediaRecorder.stop();
        }, 11000);
    };

    const playMyOhrBaby = () => {
        if (recUrl) {
            const audio = new Audio(recUrl);
            // console.log("COPY PASTE the URL to see the audio in your browser", audio);
            audio.play();
            // console.log("I'm playing");
        }
    }

    const handleDiscard = () => {
        const confirmed = window.confirm("Are you sure you want to discard your audio?");
        if (confirmed) {
            setDidRecord(false);
            setRecUrl(null);
        }
        
    };

    return (
        <>
        <div className="central-inner-container">
            <div className="rec-helpers">
                <p className='text'>press and hold the ear to record a sound</p>
                {/* <p className='timer'>[timer]</p> */}
            </div>
            <h1 className="app-title">ohr</h1>
            <button className={didRecord ? "huge-ear" : "huge-ear rec"} disabled={didRecord} onClick={startRecording}>
                <img src={ear} />
            </button>
           
        </div>
         {didRecord ?
            <div className="btn-group btn-group-vertical grupped">
                <button className='btn' onClick={playMyOhrBaby}>play</button>
                <button className='btn' onClick={handleDiscard}>discard</button>
                {/* TO DO */}
                <button className='btn'>continue</button>
            </div> : null}
            </>
    )
}

export default Recording;