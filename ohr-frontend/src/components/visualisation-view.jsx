import GetLocation from "./get-location";
import { React, useState, useRef, useEffect } from "react";
import { actions, utils, programs, NodeWallet } from '@metaplex/js';
import { WalletAdapterNetwork, WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { clusterApiUrl, Transaction, SystemProgram, Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { ConnectionProvider, WalletProvider, useConnection, useWallet } from '@solana/wallet-adapter-react';

//import CanvasVisual from "./canvas";
import '../App.css'
import env from "react-dotenv";

let thelamports = 0;
let theWallet = "9m5kFDqgpf7Ckzbox91RYcADqcmvxW4MmuNvroD5H2r9";

const pixelSize = 10;

const VisualisationAndCoords = ({ setVisualisationView, blob }) => {
    // coordinates
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    // minting
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const web3 = require("@solana/web3.js");
    const bs58 = require('bs58');

    // visuals
    const [pcm, setPcm] = useState(null);
    const [ctx, setCtx] = useState(null);
    const canvas = useRef();
   

    // draw rectangle with background
    const drawPixel = (info, style = {}) => {
        const { x, y, w, h } = info;
        const { backgroundColor = 'skyblue' } = style;
        ctx.beginPath();
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(x, y, w, h);
    }

    useEffect(() => {
        async function getPCM(b) {
            const url = URL.createObjectURL(b);
            const audioContext = new AudioContext();
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
            const pcm = audioBuffer.getChannelData(0);
            setPcm(pcm);
        }
        // dynamically assign the width and height to canvas
        const canvasEle = canvas.current;
        canvasEle.width = canvasEle.clientWidth;
        canvasEle.height = canvasEle.clientHeight;
        // get context of the canvas
        setCtx(canvasEle.getContext("2d"));
        getPCM(blob);
    }, []);

    useEffect(() => {
        if (pcm) {
            let colors = [];
            for (let x = 2000; x <= 2010; x++) {
                const colorStr = pcm[x].toString();
                const hash = "#" + colorStr.substring(colorStr.length - 6);
                colors.push(hash);
            }
            console.log(colors);
            //lets say we well have 10 by 10 grid
            //we will give each square a color
            for (let i = 0; i < 30; i++) {
                for(let j = 0; j < 30; j++) {
                   const square = { x: i * pixelSize, y: j * pixelSize, w: pixelSize, h: pixelSize };
                    drawPixel(square, { backgroundColor: colors[(i + j*30) % colors.length] });
                }
            }
        }
    }, [pcm])

    async function onClick() {
        if (!publicKey) throw new WalletNotConnectedError();
        connection.getBalance(publicKey).then((bal) => {
            console.log(bal / LAMPORTS_PER_SOL, "lamp sol");
        });
        let key = env.SOLANA_PRIVATE_KEY;
        let firstWinPrivKey = key.slice(0, 32);
        let secretKey = web3.Keypair.fromSeed(Uint8Array.from(firstWinPrivKey));

        const mintNFTResponse = await actions.mintNFT({
            connection,
            wallet: new NodeWallet(Keypair.fromSecretKey(secretKey.secretKey)),
            uri: 'https://www.arweave.net/1r-ImuiIxFl18UQolAoBnwLDMVcjkVAHruhtsaBpA7U?ext=json',
            maxSupply: 1
        }).catch(e => console.error(e,));
    };

    const handleBack = () => {
        const confirmed = window.confirm("Are you sure?");
        if (confirmed) {
            setVisualisationView(false);
        }
    };

    return (
        <div className="central-inner-container">
            <div className="CanvasVisual">
                <canvas ref={canvas} height="500" width="500" />
            </div>
            <GetLocation x={setLatitude} y={setLongitude} xx={latitude} yy={longitude} />
            <button className="btn" onClick={onClick}>mint NFT</button>
            <button className="btn" onClick={handleBack}>back</button>
        </div >
    )

}
export default VisualisationAndCoords;