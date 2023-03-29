import { React, useState, useEffect } from "react";
import Arweave from 'arweave';
import CreateMetaAndMint from "./create-metadata-and-mint";

const { Buffer } = require("buffer");

const UploadDataToArweave = ({ blob }) => {
    const arweaveKey = JSON.parse(process.env.ARWEAVE_KEY);

    const arweave = Arweave.init({
        host: 'arweave.net',
        port: 443,
        protocol: 'https',
    });

    const [audioBuffer, setAudioBuffer] = useState(null);
    const [imageBuffer, setImageBuffer] = useState(null);
    const [imgUrl, setImgUrl] = useState("");
    const [audioUrl, setAudioUrl] = useState("");

     useEffect(() => {
         async function getBuffer(b) {
             const url = URL.createObjectURL(b);
             const response = await fetch(url);
             const arrayBuffer = await response.arrayBuffer();
             const buffer = Buffer.from(arrayBuffer);
             setAudioBuffer(buffer);
          }
         getBuffer(blob);
     }, []);

    useEffect(() => {
        const loadImage = async () => {
            const response = await fetch(require("../assets/smallEar.png"));
            const arrayBuffer = await response.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            setImageBuffer(buffer);
        }
        loadImage();
    }, []);
    
    //creating two arweave transactions on one click
    async function onClick() {
       // if (imageBuffer === null) return;
       
        let transaction = await arweave.createTransaction({ data: imageBuffer });
        let transaction2 = await arweave.createTransaction({ data: audioBuffer});
       // let uploader = await arweave.transactions.getUploader(transaction);

        transaction.addTag('Content-Type', 'image/img');
        transaction2.addTag('Content-Type', 'audio/wav');

        await arweave.transactions.sign(transaction, arweaveKey);
        await arweave.transactions.sign(transaction2, arweaveKey);

        const response = await arweave.transactions.post(transaction);
        const responseAudio = await arweave.transactions.post(transaction2);


        const dataUrl = transaction.id ? `https://arweave.net/${transaction.id}` : undefined;
        const dataUrlAudio = transaction2.id ? `https://arweave.net/${transaction2.id}` : undefined;
        
        setImgUrl(dataUrl);
        setAudioUrl(dataUrlAudio);
    };

    return (
      <>
        <button className="btn btn-ghost" onClick={onClick}>1. Upload data to Arweave</button>
        <CreateMetaAndMint imgUrl={imgUrl} audioUrl={audioUrl}/>
      </>

    );
}

export default UploadDataToArweave;