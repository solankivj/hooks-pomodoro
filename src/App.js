import React, { useState, useRef } from 'react';
import './styles.css';

const padTime = (time) => {
  return time.toString().padStart(2, '0')
}

export default function App() {
  const [timeLeft, setTimeLeft] = useState(25*60);
  const [title, setTitle] = useState('Let the countdown begin!!!');
  const intervalRef = useRef(null);

  const startTimer = () => {
    if (intervalRef.current !== null) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft(timeLeft => {
        if(timeLeft >= 1) return timeLeft - 1;
        setTitle(`You're doing great!`)
        return  0;
      })
    }, 1000)
  }

  const stopTimer = () => {
    if (intervalRef.current === null) return;

    clearTimeout(intervalRef.current)
    setTitle('Keep it up!')
    intervalRef.current = null
  }

  const resetTimer = () => {
    if (intervalRef.current === null) return;

    clearTimeout(intervalRef.current)
    intervalRef.current = null
    setTitle('Ready to go another round!')
    setTimeLeft(25 * 60)
  }

  const minutes = padTime(Math.floor(timeLeft / 60));
  const seconds = padTime((timeLeft - (minutes * 60)))
  return (
    <div className="app">
      <h2>{title}</h2>

      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className="buttons">
        <button type="button" onClick={startTimer}>Start</button>
        <button type="button" onClick={stopTimer}>Stop</button>
        <button type="button" onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}