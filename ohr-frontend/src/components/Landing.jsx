function Landing({ear}) {
    return (
        <>
            <div className="middle-of-the-screen">
                <h1>ohr</h1>
                <img className="listen" src={ear} />
            </div>
            <button className="btn btn-orange btn-ghost">log in</button>
        </>
    )
}

export default Landing;