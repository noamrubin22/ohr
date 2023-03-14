import React, { useState, useEffect } from "react";

function Timer({ recording, recUrl }) {
  const [timeLeft, setTimeLeft] = useState(7);

  useEffect(() => {
    setTimeLeft(7);
  }, [recUrl]);

  useEffect(() => {
    let timer;

    if (recording && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [recording, timeLeft]);

  useEffect(() => {
    if (!recording) {
      setTimeLeft(timeLeft);
    }
  }, [recording]);

  return <div className="timer"> 00.0{timeLeft}</div>;
}

export default Timer;
