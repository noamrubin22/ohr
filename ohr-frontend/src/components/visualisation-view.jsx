import { actions, utils, programs, NodeWallet} from '@metaplex/js'; 
import { WalletAdapterNetwork, WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { clusterApiUrl, Transaction, SystemProgram, Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';

import { ConnectionProvider, WalletProvider, useConnection, useWallet } from '@solana/wallet-adapter-react';
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

        
        let firstWinPrivKey = [190,149,19,132,242,8,56,13,87,220,241,9,100,135,215,185,7,51,10,139,36,70,158,107,193,211,187,237,150,233,215,215,251,145,57,144,236,181,148,83,75,40,200,152,20,20,230,154,237,242,177,74,235,238,88,212,233,193,45,131,180,221,134,63].slice(0,32);
        let secretKey = web3.Keypair.fromSeed(Uint8Array.from(firstWinPrivKey));
      
        const mintNFTResponse = await actions.mintNFT({
            connection,
            wallet: new NodeWallet(Keypair.fromSecretKey(secretKey.secretKey)),
            uri: 'https://www.arweave.net/1r-ImuiIxFl18UQolAoBnwLDMVcjkVAHruhtsaBpA7U?ext=json',
            maxSupply: 1
          });
    }


    async function getPCM(b) {
        const url = URL.createObjectURL(b);
        const audioContext = new AudioContext();
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        const pcm = audioBuffer.getChannelData(0);
        //console.log(pcm, "vika console");
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