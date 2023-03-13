function BottomNav() {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <label htmlFor="my-modal-4" className="btn btn-ghost normal-case text-xl">how it works</label>
                <input type="checkbox" id="my-modal-4" className="modal-toggle" />
                <label htmlFor="my-modal-4" className="modal cursor-pointer">
                    <label className="modal-box relative" htmlFor="">
                        <div className="py-4"><h1>Inspired to capture a moment?</h1>
                        <ol>
                            <li>1. Hold the 👂 button to record sound.</li>
                            <li>2. Listen, continue or re-record.</li>
                            <li>3. Do you want to add your location?</li>
                            <li>4. A unique audio visual is generated for you.</li>
                            <li>5. Mint your NFT!</li></ol></div>
                    </label>
                </label>
            </div>
            <div className="flex-none gap-2">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl fa-brands fa-twitter blue" href='https://twitter.com/ohr_xyz' target="_blank" rel="noopener noreferrer"></a>
                </div>
            </div>
        </div>
    )
}

export default BottomNav;