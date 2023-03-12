function BottomNav() {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <label htmlFor="my-modal-4" className="btn btn-ghost normal-case text-xl">how it works</label>
                <input type="checkbox" id="my-modal-4" className="modal-toggle" />
                <label htmlFor="my-modal-4" className="modal cursor-pointer">
                    <label className="modal-box relative" htmlFor="">
                        <p className="py-4">Record an audio clip holding
                            the "ear" button.
                            The audio clip is then processed to create a unique
                            music visualization, which is minted as an NFT
                            on the Solana blockchain along with the audio recording.
                            This provides proof of ownership and authenticity of the
                            recording and its corresponding visualization.
                            Each audio NFT and its corresponding visualization are unique
                            and can be bought, sold, or traded on the Solana blockchain.
                            This provides a new way for collectors, music enthusiasts, and anyone
                            interested in unique and rare digital assets to own and share special
                            audio recordings and their visualizations.</p>
                    </label>
                </label>
            </div>
            <div className="flex-none gap-2">
                <div className="flex-1">
                    {/* here the twitter link will go*/}
                    <a className="btn btn-ghost text-xl fa-brands fa-twitter blue" href='https://twitter.com/ohr_xyz' target="_blank" rel="noopener noreferrer"></a>
                </div>
            </div>
        </div>
    )
}

export default BottomNav;