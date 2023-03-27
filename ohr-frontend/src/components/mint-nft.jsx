
import { React, useState, useEffect } from "react";
import { clusterApiUrl, Transaction, SystemProgram, Keypair, LAMPORTS_PER_SOL, PublicKey, Connection } from '@solana/web3.js';
import { ConnectionProvider, WalletProvider, useConnection, useWallet } from '@solana/wallet-adapter-react';
import Arweave from 'arweave';
const { Buffer } = require("buffer");


function MintNft({ blob }) {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    const wallet = useWallet();
    // TO DO: not expose priv key to the frontend!
    const arweaveKey = JSON.parse(process.env.ARWEAVE_KEY);
    const arweave = Arweave.init({
        host: 'arweave.net',
        port: 443,
        protocol: 'https',
    });

    const [audioBuffer, setAudioBuffer] = useState(null);
    //const [imageBuffer, setImageBuffer] = useState(null);
    
    useEffect(() => {
        async function getBuffer(b) {
            const url = URL.createObjectURL(b);
            console.log(url);
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            setAudioBuffer(buffer);
        }
        getBuffer(blob);
    }, []);


    // useEffect(() => {
    //     const loadImage = async () => {
    //         const response = await fetch(require('src/assets/bing-maps.png'));
    //         console.log(response, "response");
    //         const arrayBuffer = await response.arrayBuffer();
    //         console.log(arrayBuffer, "arrayBuffer");
    //         const buffer = Buffer.from(arrayBuffer) // !
    //         setImageBuffer(buffer);
    //     }
    //     loadImage();
    // }, [])


    async function onClick() {
        // if (!wallet.publicKey) throw new WalletNotConnectedError();
        // connection.getBalance(wallet.publicKey).then((bal) => {
        //     console.log(bal / LAMPORTS_PER_SOL, "lamp sol");
        // });

        const arweaveWallet = await arweave.wallets.jwkToAddress(arweaveKey);
        const arweaveWalletBallance = await arweave.wallets.getBalance(arweaveWallet);
        const ar = arweave.ar.winstonToAr(arweaveWalletBallance);
        console.log(arweaveWalletBallance, 'Winston');
        console.log(ar, 'AR');

        if (audioBuffer === null) {
            return;
        }
        console.log(audioBuffer, "BUFFER");

        let transaction = await arweave.createTransaction(
            { data: audioBuffer },
            arweaveKey
        );
        transaction.addTag('Content-Type', 'audio/wav');
        transaction.addTag('Version', '1.0.1');
        transaction.addTag('Type', 'post');
        await arweave.transactions.sign(transaction, arweaveKey);

        let uploader = await arweave.transactions.getUploader(transaction);
        while (!uploader.isComplete) {
            await uploader.uploadChunk();
            console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`);
        }
        console.log(transaction);
        const response = await arweave.transactions.post(transaction);
        console.log(response, "RESPONSE");
        const status = await arweave.transactions.getStatus(transaction.id);
        console.log(`Completed transaction ${transaction.id} with status code ${JSON.stringify(status)}!`);

        // const mintNFTResponse = await actions.mintNFT({
        //     connection,
        //     wallet: wallet,
        //     uri: 'https://www.arweave.net/1r-ImuiIxFl18UQolAoBnwLDMVcjkVAHruhtsaBpA7U?ext=json',
        //     maxSupply: 1
        // }).catch(e => console.error(e,));
    };

    return (
        <button className="btn btn-ghost big" onClick={onClick}>mint NFT</button>
    );
}


export default MintNft;
