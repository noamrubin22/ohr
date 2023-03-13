import React, { useState, useEffect } from 'react';

function Timer({ recording, recUrl }) {
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    setTimeLeft(10);
  }, [recUrl]);

  useEffect(() => {
    let timer;

    if (recording && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [recording, timeLeft]);

  useEffect(() => {
    if (!recording) {
      setTimeLeft(timeLeft);
    }
  }, [recording]);

  return (
    <div className="timer"> {timeLeft}</div>
  );
}

export default Timer;