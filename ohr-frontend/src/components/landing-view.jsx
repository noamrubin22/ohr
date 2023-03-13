function Landing({ ear }) {
  return (
    <div className="central-inner-container">
      <h1 className="app-title">øhr</h1>
      <h1 className="app-title-top">øhr</h1>
      <button className="huge-ear">
        <img src={ear} alt="Ear recording button" />
      </button>
    </div>
  );
}

export default Landing;
