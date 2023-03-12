import { actions, utils, programs, NodeWallet} from '@metaplex/js'; 
import { WalletAdapterNetwork, WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { clusterApiUrl, Transaction, SystemProgram, Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';

import { ConnectionProvider, WalletProvider, useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useEffect } from 'react';
import env from "react-dotenv";

let thelamports = 0;
let theWallet = "9m5kFDqgpf7Ckzbox91RYcADqcmvxW4MmuNvroD5H2r9"

function Visualisation({ setVisualisationView, blob }) {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const web3 = require("@solana/web3.js");

    const bs58 = require('bs58');
    
    async function onClick()  {

        if (!publicKey) throw new WalletNotConnectedError();
        connection.getBalance(publicKey).then((bal) => {
            console.log(bal/LAMPORTS_PER_SOL, "lamp sol");
        });
        let key = env.SOLANA_PRIVATE_KEY;
        let firstWinPrivKey = key.slice(0,32);
        let secretKey = web3.Keypair.fromSeed(Uint8Array.from(firstWinPrivKey));
      
        const mintNFTResponse = await actions.mintNFT({
            connection,
            wallet: new NodeWallet(Keypair.fromSecretKey(secretKey.secretKey)),
            uri: 'https://www.arweave.net/1r-ImuiIxFl18UQolAoBnwLDMVcjkVAHruhtsaBpA7U?ext=json',
            maxSupply: 1
          }).catch(e=>console.error(e, "erroooooor"));
    }

    async function getPCM(b) {
        const url = URL.createObjectURL(b);
        const audioContext = new AudioContext();
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        const pcm = audioBuffer.getChannelData(0);
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
            <button className="btn" onClick={onClick}>mint NFT</button>
            <button className="btn" onClick={handleBack}>back</button>
        </div>
    )
}

export default Visualisation;