
import { React, useState, useRef, useEffect } from "react";
import { actions, utils, programs, NodeWallet } from '@metaplex/js';
import { WalletAdapterNetwork, WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { clusterApiUrl, Transaction, SystemProgram, Keypair, LAMPORTS_PER_SOL, PublicKey, Connection } from '@solana/web3.js';
import { ConnectionProvider, WalletProvider, useConnection, useWallet } from '@solana/wallet-adapter-react';
import Arweave from 'arweave';

import { JWKInterface } from 'arweave/node/lib/wallet';

const { struct, u32, ns64 } = require("@solana/buffer-layout");
const { Buffer } = require("buffer");


function MintNft({ blob }) {
	
	const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
	const wallet = useWallet();
	const arweave = Arweave.init({
		host: 'arweave.net',
		port: 443,
		protocol: 'https',
	});

	//const [buffer, setBuffer] = useState(null);
	//console.log(buffer, "AUDIOBUFFER");

	const [imageBuffer, setImageBuffer] = useState(null)
	//console.log(imageBuffer, "IMAGEBUFFER");

	//const arweaveKey = process.env.ARWEAVE_KEY;
	const arweaveKey = JSON.parse(process.env.ARWEAVE_KEY);
	//console.log(arweaveKey);

	// useEffect(() => {
	// 	async function getBuffer(b) {
	// 		const url = URL.createObjectURL(b);
	// 		console.log(url)
	// 		const response = await fetch(url);
	// 		const arrayBuffer = await response.arrayBuffer();
	// 		//setBuffer(arrayBuffer);
	// 		const CHUNK_SIZE = 8192; // 8KB chunks
	// 		const bytes = new Uint8Array(arrayBuffer);
	// 		const byteCharacters = [];
	// 		for (let i = 0; i < bytes.length; i += CHUNK_SIZE) {
	// 			const chunk = bytes.slice(i, i + CHUNK_SIZE);
	// 			const base64Chunk = btoa(String.fromCharCode.apply(null, chunk));
	// 			byteCharacters.push(base64Chunk);
	// 		}
			  
	// 		setBuffer(byteCharacters.join(""));
			  
	// 	}
	// 	getBuffer(blob);
	// }, []);


	useEffect(() => {
		const loadImage = async () => {
			const response2 = await fetch(require('../assets/d.png'));
			console.log(response2, "resp2")
			const buffer = await response2.arrayBuffer();
			console.log(buffer, "buf2");

			const CHUNK_SIZE = 8192; // 8KB chunks
			const bytes = new Uint8Array(buffer);
			const byteCharacters = [];
		  
			for (let i = 0; i < bytes.length; i += CHUNK_SIZE) {
			  const chunk = bytes.slice(i, i + CHUNK_SIZE);
			  const base64Chunk = btoa(String.fromCharCode.apply(null, chunk));
			  byteCharacters.push(base64Chunk);
			}
		  
			setImageBuffer(byteCharacters.join(""));

			// const uint8Array = new Uint8Array(buffer);
			// console.log(uint8Array, "uint8Array");
			// const base64 = btoa(String.fromCharCode.apply(null, uint8Array));
			// console.log(base64, "base64")
			// setImageBuffer(base64);
			// console.log(base64, "BASE64");


			// const fs = require('fs');

			// const png = fs.readFileSync('./ohr-frontend/src/assets/ohr2.png');
			// const baaaase64 = png.toString('base64');

			//console.log(baaaase64);
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
		const ar = arweave.ar.winstonToAr(arweaveWalletBallance);
		console.log(arweaveWalletBallance, 'Winston');
		console.log(ar, 'AR');

		if (imageBuffer === null) {
			return
		}
		console.log(imageBuffer, "imageBUFFER");

		let transaction = await arweave.createTransaction(
			{ data: imageBuffer },
			arweaveKey
		);
		transaction.addTag('Content-Type', 'image/png')
		transaction.addTag('Version', '1.0.1')
		// // add some custom tags to the transaction
		// transaction.addTag('App-Name', 'PublicSquare')
		// transaction.addTag('Content-Type', 'image/png')
		// transaction.addTag('Version', '1.0.1')
		// transaction.addTag('Type', 'post')

		await arweave.transactions.sign(transaction, arweaveKey);
		console.log(transaction)
		const response = await arweave.transactions.post(transaction);
		console.log(response, "RESPONSE")
		const status = await arweave.transactions.getStatus(transaction.id);
		console.log(`Completed transaction ${transaction.id} with status code ${JSON.stringify(status)}!`)


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