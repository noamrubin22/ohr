function Recording({ ear }) {
    return (
        <>
            <div className="middle-of-the-screen">
                <div className="recording-view-layout">
                    <p className="o">press and hold the ear to record a sound</p>
                    <p className="o">[timer]</p>
                </div>
                <img className="listen" src={ear} />
            </div>
        </>
    )
}

export default Recording;