import ear from "../assets/ohr2.png";

function HomeBtn({ setView }) {
  const handleClick = () => {
    const confirmed = window.confirm(
      "Are you sure you want to go back to the main page?"
    );
    if (confirmed) {
      setView("");
    }
  };
  return (
    <button className="home-btn" onClick={() => handleClick()}>
      {/* <img src={ear} alt="Home button" /> */}👂
    </button>
  );
}

export default HomeBtn;
