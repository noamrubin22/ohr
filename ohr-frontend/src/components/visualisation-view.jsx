import { useEffect } from 'react';

function Visualisation({ setVisualisationView, blob }) {  
    useEffect(() => {
        async function makeAudioBuffer(b) {
            const url = URL.createObjectURL(b);
            const audioContext = new AudioContext();
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
            const data = audioBuffer.getChannelData(0);
            // console.log(data);
        }
        makeAudioBuffer(blob);
    }, [])

    const handleBack = () => {
        const confirmed = window.confirm("Are you sure?");
        if (confirmed) {
            setVisualisationView(false);
        }
    };

    return (
        <div className="central-inner-container">
            <button className="btn">mint NFT</button>
            <button className="btn" onClick={handleBack}>back</button>
        </div>
    )
}

export default Visualisation;