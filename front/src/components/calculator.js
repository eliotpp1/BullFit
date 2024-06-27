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
  const [weight, setWeight] = useState(0);
  const [calories, setCalories] = useState(0);
  const [height, setHeight] = useState(0);
  const [mas, setMas] = useState(0);
  const [restingHR, setRestingHR] = useState(0);
  const [maximalHR, setMaximalHR] = useState(0);
  const [zone1, setZone1] = useState(0);
  const [zone2, setZone2] = useState(0);
  const [zone3, setZone3] = useState(0);
  const [zone4, setZone4] = useState(0);
  const [zone5, setZone5] = useState(0);

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

  const calculateCalories = (event) => {
    event.preventDefault();
    const calories = 1.036 * weight * distance;
    setCalories(calories.toFixed(2));
  };

  const calculateMAS = (event) => {
    event.preventDefault();
    const mas = (1000 * distance) / (height * height);
    setMas(mas.toFixed(2));
  };

  const calculateHRZ = (event) => {
    event.preventDefault();
    const zone1 = 0.5 * (maximalHR - restingHR) + restingHR;
    const zone2 = 0.6 * (maximalHR - restingHR) + restingHR;
    const zone3 = 0.7 * (maximalHR - restingHR) + restingHR;
    const zone4 = 0.8 * (maximalHR - restingHR) + restingHR;
    const zone5 = 0.9 * (maximalHR - restingHR) + restingHR;
    setZone1(zone1.toFixed(2));
    setZone2(zone2.toFixed(2));
    setZone3(zone3.toFixed(2));
    setZone4(zone4.toFixed(2));
    setZone5(zone5.toFixed(2));
  };

  return (
    <>
      <div>
        <h1>Running Calculator</h1>
        <p>by BullFit</p>
      </div>
      <div>
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
      </div>

      <div>
        <h3>Results</h3>
        <p>Speed: {speed} km/h</p>
        <p>Pace: {pace} min/km</p>
      </div>

      <div>
        <h2> Calories burn during race </h2>
        <form onSubmit={calculateCalories}>
          <label htmlFor="weight">Weight (in kg)</label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <label htmlFor="distance">Distance (in km)</label>
          <input
            type="number"
            id="distance"
            name="distance"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          />
          <button type="submit">Calculate</button>
        </form>
      </div>
      <div>
        <h3>Results</h3>
        <p>Calories burned: {calories}</p>
      </div>
      <div>
        <h2>Calculate your MAS</h2>
        <form onSubmit={calculateMAS}>
          <label htmlFor="weight">Weight (in kg)</label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <label htmlFor="height">Height (in cm)</label>
          <input
            type="number"
            id="height"
            name="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
          <button type="submit">Calculate</button>
        </form>
      </div>
      <div>
        <h3>Results</h3>
        <p>MAS: {mas}</p>
      </div>
      <div>
        <h2>Calculate your heart rate zone</h2>
        <form onSubmit={calculateHRZ}>
          <label htmlFor="restingHR">Resting heart rate</label>
          <input
            type="number"
            id="restingHR"
            name="restingHR"
            value={restingHR}
            onChange={(e) => setRestingHR(e.target.value)}
          />
          <label htmlFor="maximalHR">Maximal heart rate</label>
          <input
            type="number"
            id="maximalHR"
            name="maximalHR"
            value={maximalHR}
            onChange={(e) => setMaximalHR(e.target.value)}
          />
          <button type="submit">Calculate</button>
        </form>
      </div>
      <div>
        <h3>Results</h3>
        <table>
          <tr>
            <th>Zone</th>
            <th>Percentage</th>
          </tr>
          <tr>
            <td>Zone 1</td>
            <td>50-60%</td>
            <td>{zone1}</td>
          </tr>
          <tr>
            <td>Zone 2</td>
            <td>60-70%</td>
            <td>{zone2}</td>
          </tr>
          <tr>
            <td>Zone 3</td>
            <td>70-80%</td>
            <td>{zone3}</td>
          </tr>
          <tr>
            <td>Zone 4</td>
            <td>80-90%</td>
            <td>{zone4}</td>
          </tr>
          <tr>
            <td>Zone 5</td>
            <td>90-100%</td>
            <td>{zone5}</td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default Calculator;
