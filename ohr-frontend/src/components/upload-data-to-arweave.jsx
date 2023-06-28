import { React, useState, useEffect } from "react";
import Arweave from 'arweave';
import { actions } from '@metaplex/js';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { clusterApiUrl, LAMPORTS_PER_SOL, Connection } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';

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
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    const wallet = useWallet();

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
        console.log(dataUrl, "img url")

        const dataUrlAudio = transaction2.id ? `https://arweave.net/${transaction2.id}` : undefined;
        console.log(`${dataUrlAudio}?ext=wav`, "audio url")

        setImgUrl(dataUrl);
        setAudioUrl(dataUrlAudio);

        let metadata = `{
            "name":"øhr5",
            "symbol":"NFT",
            "description":"playable nft",
            "seller_fee_basis_points":100,
            "image":"${imgUrl}?ext=png",
            "animation_url": "${audioUrl}?ext=wav",
            "attributes":[{"trait_type":"Ear","value":"Audio NFT Recording"}],
            "external_url":"https://noamrubin22.github.io/ohr/",
            "properties":
                {"files":[
                    {
                        "uri":"${audioUrl}?ext=wav",
                        "type":"audio/wav"
                    },
                    {
                        "uri":"${imgUrl}?ext=png",
                        "type":"image/png"
                    }
                ],
                "category":"audio",
                "creators":[{"address":"CyVTvTSEYWv9LQHwmR3w69zVPMBZWJxdAahYp6JqFfkp",
                "verified":true,
                "share":100}]}
            }`
        
            metadata = metadata.trim();
            const metadataRequest = JSON.parse(JSON.stringify(metadata));

        if (!wallet.publicKey) throw new WalletNotConnectedError();
        connection.getBalance(wallet.publicKey).then((bal) => {
            console.log(bal / LAMPORTS_PER_SOL, "lamp sol");
        });
        if (metadataRequest === null) return;
        
        const metadataTransaction = await arweave.createTransaction(
            { data: metadataRequest },
            arweaveKey
        );
        metadataTransaction.addTag('Content-Type', 'application/json');
        await arweave.transactions.sign(metadataTransaction, arweaveKey);

        // the uri
        console.log(`https://arweave.net/${metadataTransaction.id}`);

        let rresponse = await arweave.transactions.post(metadataTransaction);
        console.log(response);

        const mintNFTResponse = await actions.mintNFT({
            connection,
            wallet: wallet,
            uri: `https://arweave.net/${metadataTransaction.id}`,
            maxSupply: 1
        }).catch(e => console.error(e,));
    };

    return (
      <>
        <button className="btn btn-ghost big" onClick={onClick}>MINT NFT</button>
        {/* <CreateMetaAndMint imgUrl={imgUrl} audioUrl={audioUrl}/> */}
      </>
    );
}

export default UploadDataToArweave;