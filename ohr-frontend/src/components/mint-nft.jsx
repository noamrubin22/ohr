
import { React, useState, useEffect } from "react";
import { actions } from '@metaplex/js';
import { WalletAdapterNetwork, WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { clusterApiUrl, Transaction, SystemProgram, Keypair, LAMPORTS_PER_SOL, PublicKey, Connection } from '@solana/web3.js';
import { ConnectionProvider, WalletProvider, useConnection, useWallet } from '@solana/wallet-adapter-react';
import Arweave from 'arweave';
const { Buffer } = require("buffer");


function MintNft({ blob }) {
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
            const buffer = Buffer.from(arrayBuffer) // !
            setImageBuffer(buffer);
        }
        loadImage();
    }, []);


    async function onClick() {
        if (!wallet.publicKey) throw new WalletNotConnectedError();
        connection.getBalance(wallet.publicKey).then((bal) => {
            console.log(bal / LAMPORTS_PER_SOL, "lamp sol");
        });

        // UPLOADING
        if (imageBuffer === null) {
            return;
        }
        console.log(imageBuffer, "BUFFER");

        let transaction = await arweave.createTransaction(
            { data: imageBuffer },
        );
        //transaction.addTag('Content-Type', 'audio/wav');
        transaction.addTag('Content-Type', 'image/img');

        await arweave.transactions.sign(transaction, arweaveKey);
        const response = await arweave.transactions.post(transaction);
        console.log(response);
        const dataUrl = transaction.id ? `https://arweave.net/${transaction.id}` : undefined;
        console.log(dataUrl);

        //MINTING
        // lion
        // uri: 'https://www.arweave.net/1r-ImuiIxFl18UQolAoBnwLDMVcjkVAHruhtsaBpA7U?ext=json',

        // const mintNFTResponse = await actions.mintNFT({
        //     connection,
        //     wallet: wallet,
        //     uri: 'https://arweave.net/lYXTyvRrFNtrWii98Rg2oCt3dWUxh7kChlTJiLWXBhc',
        //     maxSupply: 1
        // }).catch(e => console.error(e,));
    };

    return (
        <button className="btn btn-ghost big" onClick={onClick}>mint NFT</button>
    );
}

export default MintNft;