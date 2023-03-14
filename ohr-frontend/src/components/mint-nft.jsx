
import { React, useState, useRef, useEffect } from "react";
import { actions, utils, programs, NodeWallet } from '@metaplex/js';
import { WalletAdapterNetwork, WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { clusterApiUrl, Transaction, SystemProgram, Keypair, LAMPORTS_PER_SOL, PublicKey, Connection } from '@solana/web3.js';
import { ConnectionProvider, WalletProvider, useConnection, useWallet } from '@solana/wallet-adapter-react';
import Arweave from 'arweave';
import { JWKInterface } from 'arweave/node/lib/wallet';
//import * as fs from "fs";
//import ear from "../assets/ohr2.png";

const { struct, u32, ns64 } = require("@solana/buffer-layout");
const { Buffer } = require("buffer");
//import pic from "../assets/ohr2.png"


function MintNft({ blob }) {
	const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
	const wallet = useWallet();
	const arweave = Arweave.init({
		host: 'arweave.net',
		port: 443,
		protocol: 'https',
	});
	// here i found that on arweave u can upload 
	// arrayBuffer https://github.com/ArweaveTeam/arweave-js/blob/a07243c0e418a4e8d7ecc4afa0a1aa55e8fb2acc/src/common/common.ts
	// so i was trying to do it
	// i think something is happening...
	// but POST is giving me errors

	const [imageBuffer, setImageBuffer] = useState(null)
	const [buffer, setBuffer] = useState(null);
	console.log(buffer);

	//const arweaveKey = process.env.ARWEAVE_KEY;
	const arweaveKey = JSON.parse(process.env.ARWEAVE_KEY);
	//console.log(arweaveKey);

	useEffect(() => {
		async function getBuffer(b) {
			const url = URL.createObjectURL(b);
			const response = await fetch(url);
			const arrayBuffer = await response.arrayBuffer();
			setBuffer(arrayBuffer);
		}
		getBuffer(blob);
	}, []);

	//const b64string = ear.b64string
  //const buf = Buffer.from(b64string, 'base64')
	useEffect(() => {
		const loadImage = async () => {
      const buffer = await fetch(require("../assets/bing-maps.png")).then(r => r.arrayBuffer())
      const typedArray = new Uint8Array(buffer)
      const codes = typedArray.reduce((data, byte)=> data + String.fromCharCode(byte), '');
     const base64 = btoa(codes);
		 setImageBuffer(base64)
		}
		loadImage();
	}, [])



	async function onClick() {
		if (!wallet.publicKey) throw new WalletNotConnectedError();
		connection.getBalance(wallet.publicKey).then((bal) => {
			console.log(bal / LAMPORTS_PER_SOL, "lamp sol");
		});

		const arweaveWallet = await arweave.wallets.jwkToAddress(arweaveKey);
		const arweaveWalletBallance = await arweave.wallets.getBalance(arweaveWallet);
		if (buffer) {
			//var u8 = new Uint8Array([65, 66, 67, 68]);
		//	const uint8Array = new Uint8Array(buffer);
			//const base64String = uint8Array.toString("base64");
			//setImageBuffer(base64String)
			console.log(imageBuffer, "base6444444")
		}
		  console.log(arweaveWallet);
		console.log(arweaveWalletBallance);

	   let transaction = await arweave.createTransaction(
			  { data: imageBuffer },
			   arweaveKey
		   );
		
		transaction.addTag("Content-Type", 'image/png');
	  await arweave.transactions.sign(transaction, arweaveKey);
   	const response = await arweave.transactions.post(transaction);
		const status = await arweave.transactions.getStatus(transaction.id)
	 	console.log(`Completed transaction ${transaction.id} with status code ${JSON.stringify(status)}!`)
	  console.log(response, "response")

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