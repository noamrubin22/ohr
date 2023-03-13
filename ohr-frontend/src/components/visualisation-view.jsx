import GetLocation from "./get-location";
import { React, useState, useRef, useEffect } from "react";
import { actions, utils, programs, NodeWallet } from '@metaplex/js';
import { WalletAdapterNetwork, WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { clusterApiUrl, Transaction, SystemProgram, Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { ConnectionProvider, WalletProvider, useConnection, useWallet } from '@solana/wallet-adapter-react';
import env from "react-dotenv";

let thelamports = 0;
let theWallet = "9m5kFDqgpf7Ckzbox91RYcADqcmvxW4MmuNvroD5H2r9";

const pixelSize = 6.8;

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
        // taken from https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
        function componentToHex(c) {
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        }
        function rgbToHex(r, g, b) {
            return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
        }
        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
        }
        if (pcm) {
            let colors = [];
            for (let x = 2000; x <= 2020; x++) {
                const colorStr = rgbToHex(Math.floor(Math.abs(pcm[x]) * 100000000) % 256, Math.floor(Math.abs(pcm[x]) * 10000000000) % 256, Math.floor(Math.abs(pcm[x]) * 1000000000000) % 256);
                colors.push(colorStr);
            }
            console.log(colors);
            //lets say we'll have 30 by 30 grid
            //we will give each square a color
            for (let i = 0; i < 330; i++) {
                for (let j = 0; j < 330; j++) {
                    const square = { x: i * pixelSize, y: j * pixelSize, w: pixelSize, h: pixelSize };
                    drawPixel(square, {
                        backgroundColor: colors[(i + j * getRandomInt(50)) % colors.length]
                    });
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
        setVisualisationView(false);
    };

    return (
        <div className="central-inner-container">
            <div className="CanvasVisual">
                <canvas ref={canvas} />
            </div>
            <div className="vis-btns">
                <GetLocation x={setLatitude} y={setLongitude} xx={latitude} yy={longitude} />
                <button className="btn btn-ghost big" onClick={onClick}>mint NFT</button>
                <button className="btn btn-ghost" onClick={handleBack}>back</button>
            </div>
        </div >
    )

}
export default VisualisationAndCoords;