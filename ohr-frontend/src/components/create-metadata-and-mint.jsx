import { React } from "react";
import Arweave from 'arweave';
import { actions } from '@metaplex/js';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { clusterApiUrl, LAMPORTS_PER_SOL, Connection } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';

const CreateMetaAndMint = (props) => {
    const arweaveKey = JSON.parse(process.env.ARWEAVE_KEY);
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    const wallet = useWallet();
    const arweave = Arweave.init({
        host: 'arweave.net',
        port: 443,
        protocol: 'https',
    });

    let metadata = `{
    "name":"øhr",
    "symbol":"NFT",
    "description":"lets seeeeee",
    "seller_fee_basis_points":100,
    "image":"${props.imgUrl}",
    "audio": "${props.audioUrl}",
    "attributes":[{"trait_type":"Ear","value":"Classic"}],
    "external_url":"",
    "properties":
        {"files":[{"uri":"${props.audioUrl}","type":"audio/wav"}],
        "category":"audio",
        "creators":[{"address":"CyVTvTSEYWv9LQHwmR3w69zVPMBZWJxdAahYp6JqFfkp","verified":true,"share":100}]}
    }`

    metadata = metadata.trim();
    const metadataRequest = JSON.parse(JSON.stringify(metadata));

    async function onClick() {
        if (!wallet.publicKey) throw new WalletNotConnectedError();
        connection.getBalance(wallet.publicKey).then((bal) => {
            console.log(bal / LAMPORTS_PER_SOL, "lamp sol");
        });
        if (metadataRequest === null) return;
        
        const metadataTransaction = await arweave.createTransaction(
            { data: metadataRequest },
            arweaveKey
        );
        metadataTransaction.addTag('Content-Type', 'application/json');
        await arweave.transactions.sign(metadataTransaction, arweaveKey);

        // the uri
        console.log(`https://arweave.net/${metadataTransaction.id}`);

        let response = await arweave.transactions.post(metadataTransaction);
        console.log(response);

        const mintNFTResponse = await actions.mintNFT({
            connection,
            wallet: wallet,
            uri: `https://arweave.net/${metadataTransaction.id}`,
            maxSupply: 1
        }).catch(e => console.error(e,));
    }

    return (
        <button className="btn btn-ghost" onClick={onClick}>2.Create metadata and mint</button>
    );
}

export default CreateMetaAndMint;