import React from 'react';

function Timer() {
  const [hours, setHours] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);
  const [milliseconds, setMilliseconds] = React.useState(0);
  const [isActive, setIsActive] = React.useState(false);

  React.useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setMilliseconds((prevMilliseconds) => prevMilliseconds + 1);
      }, 1);
    } else if (!isActive && milliseconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, milliseconds]);

  React.useEffect(() => {
    if (milliseconds === 1000) {
      setSeconds((prevSeconds) => prevSeconds + 1);
      setMilliseconds(0);
    }
  }, [milliseconds]);

  React.useEffect(() => {
    if (seconds === 60) {
      setMinutes((prevMinutes) => prevMinutes + 1);
      setSeconds(0);
    }
  }, [seconds]);

  React.useEffect(() => {
    if (minutes === 60) {
      setHours((prevHours) => prevHours + 1);
      setMinutes(0);
    }
  }, [minutes]);

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  const startTimer = () => {
    setIsActive(true);
  };

  const stopTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setMilliseconds(0);
  };

  return (
    <div>
      <p>{`${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(
        milliseconds,
      )}`}</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}

export default Timer;
