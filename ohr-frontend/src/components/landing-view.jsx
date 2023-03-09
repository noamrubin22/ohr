function Landing({ ear }) {
    return (
        <div className="central-inner-container">
            <h1 className="app-title">ohr</h1>
            <button className="huge-ear">
                <img src={ear} />
            </button>
        </div>
    )
}

export default Landing;