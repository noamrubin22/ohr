import GetLocation from "./get-location";
import { React, useState, useRef, useEffect } from "react";
import { actions, utils, programs, NodeWallet } from '@metaplex/js';
import { WalletAdapterNetwork, WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { clusterApiUrl, Transaction, SystemProgram, Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { ConnectionProvider, WalletProvider, useConnection, useWallet } from '@solana/wallet-adapter-react';
//import CanvasVisual from "./canvas";
import '../App.css'


let thelamports = 0;
let theWallet = "9m5kFDqgpf7Ckzbox91RYcADqcmvxW4MmuNvroD5H2r9";


const VisualisationAndCoords = ({ setVisualisationView, blob }) => {

    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const web3 = require("@solana/web3.js");
    const bs58 = require('bs58');
    // track the color from pcm3
    const [color1, setColor1] = useState("");
    const [color2, setColor2] = useState("");
    const [color3, setColor3] = useState("");
    const [color4, setColor4] = useState("");
    const [color5, setColor5] = useState("");
    const [color6, setColor6] = useState("");
    const [color7, setColor7] = useState("");
    const [color8, setColor8] = useState("");
    const [color9, setColor9] = useState("");



    async function onClick() {

        if (!publicKey) throw new WalletNotConnectedError();
        connection.getBalance(publicKey).then((bal) => {
            console.log(bal / LAMPORTS_PER_SOL, "lamp sol");
        });

        let firstWinPrivKey = [190, 149, 19, 132, 242, 8, 56, 13, 87, 220, 241, 9, 100, 135, 215, 185, 7, 51, 10, 139, 36, 70, 158, 107, 193, 211, 187, 237, 150, 233, 215, 215, 251, 145, 57, 144, 236, 181, 148, 83, 75, 40, 200, 152, 20, 20, 230, 154, 237, 242, 177, 74, 235, 238, 88, 212, 233, 193, 45, 131, 180, 221, 134, 63].slice(0, 32);
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

        const pcm01 = pcm[10000].toString();
        const pcm1 = "#" + pcm01.substring(pcm01.length - 6);

        const pcm02 = pcm[20000].toString();
        const pcm2 = "#" + pcm02.substring(pcm02.length - 6);

        const pcm03 = pcm[30000].toString();
        const pcm3 = "#" + pcm03.substring(pcm03.length - 6);

        const pcm04 = pcm[40000].toString();
        const pcm4 = "#" + pcm04.substring(pcm04.length - 6);

        const pcm05 = pcm[50000].toString();
        const pcm5 = "#" + pcm05.substring(pcm05.length - 6);

        const pcm06 = pcm[60000].toString();
        const pcm6 = "#" + pcm06.substring(pcm06.length - 6);

        const pcm07 = pcm[60000].toString();
        const pcm7 = "#" + pcm07.substring(pcm07.length - 6);

        const pcm08 = pcm[80000].toString();
        const pcm8 = "#" + pcm08.substring(pcm08.length - 6);

        const pcm09 = pcm[90000].toString();
        const pcm9 = "#" + pcm09.substring(pcm09.length - 6);


        setColor1(pcm1);
        setColor2(pcm2);
        setColor3(pcm3);
        setColor4(pcm4);
        setColor5(pcm5);
        setColor6(pcm6);
        setColor7(pcm7);
        setColor8(pcm8);
        setColor9(pcm9);


    }


    getPCM(blob);

    const handleBack = () => {
        const confirmed = window.confirm("Are you sure?");
        if (confirmed) {
            setVisualisationView(false);
        }
    };


    // canvas

    const canvas = useRef();
    let ctx = null;

    // initialize the canvas context
    useEffect(() => {
        // dynamically assign the width and height to canvas
        const canvasEle = canvas.current;
        canvasEle.width = canvasEle.clientWidth;
        canvasEle.height = canvasEle.clientHeight;

        // get context of the canvas
        ctx = canvasEle.getContext("2d");
    }, []);

    const pixelSize = 10;

    useEffect(() => {
        // first row
        const pixel1 = { x: 0, y: 0, w: pixelSize, h: pixelSize };
        drawPixel(pixel1, { backgroundColor: color1 });

        const pixel2 = { x: pixelSize, y: 0, w: pixelSize, h: pixelSize };
        drawPixel(pixel2, { backgroundColor: color2 });

        const pixel3 = { x: 2 * pixelSize, y: 0, w: pixelSize, h: pixelSize };
        drawPixel(pixel3, { backgroundColor: color3 });

        const pixel4 = { x: 3 * pixelSize, y: 0, w: pixelSize, h: pixelSize };
        drawPixel(pixel4, { backgroundColor: color4 });

        const pixel5 = { x: 4 * pixelSize, y: 0, w: pixelSize, h: pixelSize };
        drawPixel(pixel5, { backgroundColor: color5 });

        const pixel6 = { x: 5 * pixelSize, y: 0, w: pixelSize, h: pixelSize };
        drawPixel(pixel6, { backgroundColor: color6 });

        const pixel7 = { x: 6 * pixelSize, y: 0, w: pixelSize, h: pixelSize };
        drawPixel(pixel7, { backgroundColor: color7 });

        // second row
        const pixel2_1 = { x: 0, y: pixelSize, w: pixelSize, h: pixelSize };
        drawPixel(pixel2_1, { backgroundColor: color8 });

        const pixel2_2 = { x: pixelSize, y: pixelSize, w: pixelSize, h: pixelSize };
        drawPixel(pixel2_2, { backgroundColor: color9 });

        const pixel2_3 = { x: 2 * pixelSize, y: pixelSize, w: pixelSize, h: pixelSize };
        drawPixel(pixel2_3, { backgroundColor: color1 });

        const pixel2_4 = { x: 3 * pixelSize, y: pixelSize, w: pixelSize, h: pixelSize };
        drawPixel(pixel2_4, { backgroundColor: color2 });

        const pixel2_5 = { x: 4 * pixelSize, y: pixelSize, w: pixelSize, h: pixelSize };
        drawPixel(pixel2_5, { backgroundColor: color3 });

        const pixel2_6 = { x: 5 * pixelSize, y: pixelSize, w: pixelSize, h: pixelSize };
        drawPixel(pixel2_6, { backgroundColor: color4 });

        const pixel2_7 = { x: 6 * pixelSize, y: pixelSize, w: pixelSize, h: pixelSize };
        drawPixel(pixel2_7, { backgroundColor: color5 });


    }, []);

    // draw rectangle with background
    const drawPixel = (info, style = {}) => {
        const { x, y, w, h } = info;
        const { backgroundColor = 'skyblue' } = style;

        ctx.beginPath();
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(x, y, w, h);
    }


    return (
        <div className="central-inner-container">
            <div className="CanvasVisual">
                <canvas ref={canvas} height="400" width="500">
                </canvas>
            </div>
            {/* <div className="visual">visualisation</div> */}
            <GetLocation x={setLatitude} y={setLongitude} xx={latitude} yy={longitude} />
            <button className="btn" onClick={onClick}>mint NFT</button>
            <button className="btn" onClick={handleBack}>back</button>
        </div>
    )
}

export default VisualisationAndCoords;