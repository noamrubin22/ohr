import { React, useState, useEffect } from "react";

import Arweave from 'arweave';
import { actions } from '@metaplex/js';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { clusterApiUrl, LAMPORTS_PER_SOL, Connection } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
const { Buffer } = require("buffer");

const UploadDataToArweave = ({ blob }) => {

    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    const wallet = useWallet();
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
        let metadata = `{
            "name":"øhr",
            "symbol":"NFT",
            "description":"bla bla bla",
            "seller_fee_basis_points":100,
            "image":"https://arweave.net/${transaction.id}",
            "attributes":[{"trait_type":"Ear","value":"Classic"}],
            "external_url":"",
            "properties":
                {"files":[{"uri":"https://arweave.net/${transaction.id}","type":"image/png"}],
                "category":"image",
                "creators":[{"address":"CyVTvTSEYWv9LQHwmR3w69zVPMBZWJxdAahYp6JqFfkp","verified":true,"share":100}]}
            }`

        metadata = metadata.trim();
        const metadataRequest = JSON.parse(JSON.stringify(metadata));
        console.log(metadataRequest, "METADATA");
        if (metadataRequest === null) return;

        const metadataTransaction = await arweave.createTransaction(
            { data: metadataRequest },
            arweaveKey
        );
        metadataTransaction.addTag('Content-Type', 'application/json');
        await arweave.transactions.sign(metadataTransaction, arweaveKey);

        // the uri
        console.log(`https://arweave.net/${metadataTransaction.id}`);

        let res = await arweave.transactions.post(metadataTransaction);
        console.log(res);

        const mintNFTResponse = await actions.mintNFT({
            connection,
            wallet: wallet,
            uri: `https://arweave.net/${metadataTransaction.id}`,
            maxSupply: 1
        }).catch(e => console.error(e,));
    };

    return (
        <button className="btn btn-ghost" onClick={onClick}>mint</button>
    );
}

export default UploadDataToArweave;