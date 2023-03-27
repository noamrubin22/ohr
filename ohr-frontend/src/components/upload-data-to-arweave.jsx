import { React, useState, useEffect } from "react";
import Arweave from 'arweave';
const { Buffer } = require("buffer");

const UploadDataToArweave = ({ blob }) => {
    const arweaveKey = JSON.parse(process.env.ARWEAVE_KEY);
    const arweave = Arweave.init({
        host: 'arweave.net',
        port: 443,
        protocol: 'https',
    });

    //const [audioBuffer, setAudioBuffer] = useState(null);
    const [imageBuffer, setImageBuffer] = useState(null);

    // useEffect(() => {
    //     async function getBuffer(b) {
    //         const url = URL.createObjectURL(b);
    //         console.log(url);
    //         const response = await fetch(url);
    //         const arrayBuffer = await response.arrayBuffer();
    //         const buffer = Buffer.from(arrayBuffer);
    //         setAudioBuffer(buffer);
    //     }
    //     getBuffer(blob);
    // }, []);

    useEffect(() => {
        const loadImage = async () => {
            const response = await fetch(require("../assets/smallEar.png"));
            //console.log(response, "response");
            const arrayBuffer = await response.arrayBuffer();
            //console.log(arrayBuffer, "arrayBuffer");
            const buffer = Buffer.from(arrayBuffer);
            setImageBuffer(buffer);
        }
        loadImage();
    }, []);

    // if uploading an audio replace all imageBuffer to audioBuffer
    async function onClick() {
        if (imageBuffer === null) return;
        console.log(imageBuffer, "BUFFER");

        let transaction = await arweave.createTransaction({ data: imageBuffer });
        //transaction.addTag('Content-Type', 'audio/wav');
        transaction.addTag('Content-Type', 'image/img');

        await arweave.transactions.sign(transaction, arweaveKey);
        const response = await arweave.transactions.post(transaction);
        console.log(response);

        // we are going to use dataUrl to create metadata (create-metadata-and-mint.jsx)
        const dataUrl = transaction.id ? `https://arweave.net/${transaction.id}` : undefined;
        console.log(dataUrl, 'DATA UPLOADED');
    };

    return (
        <button className="btn btn-ghost" onClick={onClick}>1. upload data to Arweave</button>
    );
}

export default UploadDataToArweave;