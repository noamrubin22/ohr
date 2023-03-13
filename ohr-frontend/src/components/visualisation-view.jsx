import GetLocation from "./get-location";
import { React, useState, useRef, useEffect } from "react";
import { actions, utils, programs, NodeWallet } from '@metaplex/js';
import { WalletAdapterNetwork, WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { clusterApiUrl, Transaction, SystemProgram, Keypair, LAMPORTS_PER_SOL, PublicKey, Connection} from '@solana/web3.js';
import { ConnectionProvider, WalletProvider, useConnection, useWallet } from '@solana/wallet-adapter-react';
import * as solanaWeb3 from "@solana/web3.js";
const { struct, u32, ns64 } = require("@solana/buffer-layout");
const { Buffer } = require("buffer");

const pixelSize = 20;


const VisualisationAndCoords = ({ setVisualisationView, blob }) => {
   // const { Keypair } = require("@solana/web3.js");
    const web3 = require("@solana/web3.js");

    const wallet = new Keypair()
    
    const publicKey = new PublicKey(wallet._keypair.publicKey)                
    const secretKey = wallet._keypair.secretKey
    const connection = new Connection(clusterApiUrl('devnet'),'confirmed')

    const getWalletBalance = async() => {
        try{
            const connection = new Connection(clusterApiUrl('devnet'),'confirmed')
            const walletBalance = await connection.getBalance(publicKey)
            console.log(`Wallet Balance is ${walletBalance}`)
        }
        catch(er){
            console.log(er)
        }
    }
    
    const airDropSol = async() =>{
        try{
            const connection = new Connection(clusterApiUrl('devnet'),'confirmed')
            const fromAirDropSignature = await connection.requestAirdrop(publicKey, 1 * LAMPORTS_PER_SOL)
            const latestBlockHash = await connection.getLatestBlockhash();

            await connection.confirmTransaction({
                blockhash: latestBlockHash.blockhash,
                lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
                signature: fromAirDropSignature,
              });    
        }catch(er){
            console.log('Error Here: '+er)
        }
    }
    // coordinates
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    // minting
    //const { publicKey, sendTransaction } = useWallet();
    //const web3 = require("@solana/web3.js");
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
        console.log(solanaWeb3, "webthree")
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
            //lets say we'll have 30 by 30 grid
            //we will give each square a color
            for (let i = 0; i < 30; i++) {
                for (let j = 0; j < 30; j++) {
                    const square = { x: i * pixelSize, y: j * pixelSize, w: pixelSize, h: pixelSize };
                    drawPixel(square, { backgroundColor: colors[(i + j * 30) % colors.length] });
                }
            }
        }
    }, [pcm])

    async function onClick() {
        if (!publicKey) throw new WalletNotConnectedError();
        connection.getBalance(publicKey).then((bal) => {
            console.log(bal / LAMPORTS_PER_SOL, "lamp sol");
        });

        console.log(wallet._keypair.secretKey, "publickeeey")
        //await airDropSol();
        //await getWalletBalance();
        //await airDropSol()

        const mintNFTResponse = await actions.mintNFT({
            connection,
            wallet: new NodeWallet(Keypair.fromSecretKey(secretKey)),
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
                <canvas ref={canvas} height="500" width="500" />
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