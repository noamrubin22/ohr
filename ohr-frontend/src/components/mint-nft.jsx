
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



	async function onClick() {
		if (!wallet.publicKey) throw new WalletNotConnectedError();
		connection.getBalance(wallet.publicKey).then((bal) => {
			console.log(bal / LAMPORTS_PER_SOL, "lamp sol");
		});
		  const mintNFTResponse = await actions.mintNFT({
		      connection,
		     wallet: wallet,
		     uri: 'https://www.arweave.net/1r-ImuiIxFl18UQolAoBnwLDMVcjkVAHruhtsaBpA7U?ext=json',
		      maxSupply: 1
		 }).catch(e => console.error(e,));
	 };

	return (
		<button className="btn btn-ghost big" onClick={onClick}>mint NFT</button>
	);
}

export default MintNft;