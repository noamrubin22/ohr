import { React, useState, useRef, useEffect } from "react";
import { actions, utils, programs, NodeWallet } from "@metaplex/js";
// import { Metaplex } from "@metaplex-foundation/js";
import {
  WalletAdapterNetwork,
  WalletNotConnectedError,
} from "@solana/wallet-adapter-base";
import {
  clusterApiUrl,
  Transaction,
  SystemProgram,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  Connection,
} from "@solana/web3.js";
import {
  ConnectionProvider,
  WalletProvider,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import * as solanaWeb3 from "@solana/web3.js";
const { struct, u32, ns64 } = require("@solana/buffer-layout");
const { Buffer } = require("buffer");

const pixelSize = 6.8;

const VisualisationAndCoords = ({ setVisualisationView, blob, setView }) => {
  //const web3 = require("@solana/web3.js");
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const wallet = useWallet();
  //const metaplex = new Metaplex(connection);
  //metaplex.use(walletAdapterIdentity(wallet));

  // const getWalletBalance = async() => {
  //     try{
  //         const connection = new Connection(clusterApiUrl('devnet'),'confirmed')
  //         const walletBalance = await connection.getBalance(publicKey)
  //         console.log(`Wallet Balance is ${walletBalance}`)
  //     }
  //     catch(er){
  //         console.log(er)
  //     }
  // }

  // const airDropSol = async() =>{
  //     try{
  //         const connection = new Connection(clusterApiUrl('devnet'),'confirmed')
  //         const fromAirDropSignature = await connection.requestAirdrop(publicKey, 1 * LAMPORTS_PER_SOL)
  //         const latestBlockHash = await connection.getLatestBlockhash();

  //         await connection.confirmTransaction({
  //             blockhash: latestBlockHash.blockhash,
  //             lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
  //             signature: fromAirDropSignature,
  //           });
  //     }catch(er){
  //         console.log('Error Here: '+er)
  //     }
  // }

  // coordinates
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  // minting
  //const { publicKey, sendTransaction } = useWallet();
  //const web3 = require("@solana/web3.js");
  //const bs58 = require('bs58');
  // visuals
  const [pcm, setPcm] = useState(null);
  const [ctx, setCtx] = useState(null);
  const canvas = useRef();

  // draw rectangle with background
  const drawPixel = (info, style = {}) => {
    const { x, y, w, h } = info;
    const { backgroundColor = "skyblue" } = style;
    ctx.beginPath();
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(x, y, w, h);
  };

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
    console.log(solanaWeb3, "webthree");
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
      for (let x = 3000; x <= 3020; x++) {
        const colorStr = rgbToHex(
          Math.floor(Math.abs(pcm[x]) * 100000000) % 256,
          Math.floor(Math.abs(pcm[x]) * 10000000000) % 256,
          Math.floor(Math.abs(pcm[x]) * 1000000000000) % 256
        );
        colors.push(colorStr);
      }
      //lets say we'll have 30 by 30 grid
      //we will give each square a color
      for (let i = 0; i < 330; i++) {
        for (let j = 0; j < 330; j++) {
          const square = {
            x: i * pixelSize,
            y: j * pixelSize,
            w: pixelSize,
            h: pixelSize,
          };
          drawPixel(square, {
            backgroundColor: colors[(i + j * getRandomInt(50)) % colors.length],
          });
        }
      }
    }
  }, [pcm]);

  async function onClick() {
    if (!wallet.publicKey) throw new WalletNotConnectedError();
    connection.getBalance(wallet.publicKey).then((bal) => {
      console.log(bal / LAMPORTS_PER_SOL, "lamp sol");
    });

    //console.log(wallet._keypair.secretKey, "publickeeey")
    //await airDropSol();
    //await getWalletBalance();
    //await airDropSol()

    const mintNFTResponse = await actions
      .mintNFT({
        connection,
        wallet: wallet,
        uri: "https://www.arweave.net/1r-ImuiIxFl18UQolAoBnwLDMVcjkVAHruhtsaBpA7U?ext=json",
        maxSupply: 1,
      })
      .catch((e) => console.error(e));
  }

  const handleBack = () => {
    setView("map");
  };

  return (
    <div className="central-inner-container">
      <div className="CanvasVisual">
        <canvas ref={canvas} />
      </div>
      <div className="vis-btns">
        <button className="btn btn-ghost big" onClick={onClick}>
          mint NFT
        </button>
        <button className="btn btn-ghost" onClick={handleBack}>
          back
        </button>
      </div>
    </div>
  );
};
export default VisualisationAndCoords;
