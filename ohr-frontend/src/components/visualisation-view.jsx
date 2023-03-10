import GetLocation from "./get-location";
import { useState } from "react";

const VisualisationAndCoords = ({ setVisualisationView, blob }) => {

    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    async function getPCM(b) {
        const url = URL.createObjectURL(b);
        console.log(url)
        const audioContext = new AudioContext();
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
            console.log(audioBuffer);
        const pcm = audioBuffer.getChannelData(0);
            console.log(pcm);
            console.log(pcm[22234]); 
    }
    getPCM(blob);

    const handleBack = () => {
        const confirmed = window.confirm("Are you sure?");
        if (confirmed) {
            setVisualisationView(false);
        }
    };

    return (
        <div className="central-inner-container">
            {/* <div className="visual">visualisation</div> */}
            <GetLocation x={setLatitude} y={setLongitude} xx={latitude} yy={longitude}/>
            <button className="btn" onClick={handleBack}>back</button>
        </div>
    )
}

export default VisualisationAndCoords;