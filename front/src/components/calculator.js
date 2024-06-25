// running calculator.js component
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Calculator = () => {
  const navigate = useNavigate();
  const [distance, setDistance] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [pace, setPace] = useState(0);

  const onChangeDistance = (e) => {
    setDistance(e.target.value);
  };

  const calculateAvgSpeed = (event) => {
    event.preventDefault();
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    const speed = distance / (totalSeconds / 3600);
    const pace = totalSeconds / distance;
    setSpeed(speed.toFixed(2));
    setPace(pace.toFixed(2));
  };

  return (
    <>
      <div>
        <h1>Running Calculator</h1>
        <p>by BullFit</p>
      </div>
      <h2>Average speed and pace calculator</h2>
      <form onSubmit={calculateAvgSpeed}>
        <label htmlFor="distance">Distance (in km)</label>
        <input
          type="number"
          id="distance"
          name="distance"
          value={distance}
          onChange={onChangeDistance}
        />
        <label htmlFor="hours">Hours</label>
        <input
          type="number"
          id="hours"
          name="hours"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
        />
        <label htmlFor="minutes">Minutes</label>
        <input
          type="number"
          id="minutes"
          name="minutes"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
        />
        <label htmlFor="seconds">Seconds</label>
        <input
          type="number"
          id="seconds"
          name="seconds"
          value={seconds}
          onChange={(e) => setSeconds(e.target.value)}
        />
        <button type="submit">Calculate</button>
      </form>
      <div>
        <h3>Results</h3>
        <p>Speed: {speed} km/h</p>
        <p>Pace: {pace} min/km</p>
      </div>
    </>
  );
};

export default Calculator;
