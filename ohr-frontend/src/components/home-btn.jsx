function HomeBtn({ setView }) {

  function handleClick() {
    const confirmed = window.confirm(
      "Are you sure you want to go back to the main page? You will lose your recording."
    );
    if (confirmed) {
      setView("");
    }
  };
  
  return (
    <button className="home-btn" onClick={() => handleClick()}>
      <h1 className="app-title">øhr</h1>
      <h1 className="app-title-top">øhr</h1>
    </button>
  );
}

export default HomeBtn;
