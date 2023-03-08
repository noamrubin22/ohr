import React, { useState } from 'react';

// for now it's working on click (no holding)
// it stops automaticaly after 10 sec ( 10000 msec)
const Recording = ({ ear }) => {
    const [recording, setRecording] = useState(false);

    const startRecording = async () => {
        setRecording(true);
        // to request access to the user's mic
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        if (navigator.getUserMedia) {
            // console.log("RECORDING STARTED");
        }
        // create mediaRecorder obj https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/MediaRecorder
        const mediaRecorder = new MediaRecorder(stream);
        const recordedStream = mediaRecorder.stream;

        // https://udn.realityripple.com/docs/Web/API/MediaRecorder/dataavailable_event
        const chunks = [];

        mediaRecorder.ondataavailable = function (e) {
            chunks.push(e.data);
            // console.log("RECORDED DATA >>>>>>>> ", chunks);
        }

        mediaRecorder.onstop = function (e) {
            console.log("RECORDING STOPED");
            const audioBlob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' });
            const recUrl = window.URL.createObjectURL(audioBlob);
            // console.log("THE URL (copy paste it with `blob:`)", recUrl);
            const audio = new Audio(recUrl);
            console.log("COPY PASTE the URL to see the audio in your browser", audio);

            audio.play();

            setRecording(false);
        }
        mediaRecorder.start();

        setTimeout(() => {
            mediaRecorder.stop();
        }, 10000);
    };

    return (
        <div className="central-inner-container">
            <div className="rec-helpers">
                <p>press and hold the ear to record a sound</p>
                {/* I'm thinking to add a count down... */}
                <p>[timer]</p>
            </div>
            <button disabled={recording} onClick={startRecording}>
                <img className="huge-ear" src={ear} />
            </button>
        </div>
    )
}

export default Recording;