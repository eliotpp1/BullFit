import React, { useState } from "react";

const Calculator = () => {
  const [distance, setDistance] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [pace, setPace] = useState(0);
  const [weight, setWeight] = useState(0);
  const [distance2, setDistance2] = useState(0);
  const [calories, setCalories] = useState(0);
  const [weight2, setWeight2] = useState(0);
  const [height, setHeight] = useState(0);
  const [restingHR, setRestingHR] = useState(0);
  const [maximalHR, setMaximalHR] = useState(0);
  const [mas, setMas] = useState(0);
  const [fc60, setFc60] = useState(0);
  const [fc65, setFc65] = useState(0);
  const [fc75, setFc75] = useState(0);
  const [fc85, setFc85] = useState(0);
  const [fc95, setFc95] = useState(0);
  const [fc100, setFc100] = useState(0);

  const onChangeDistance = (e) => {
    setDistance(e.target.value);
  };

  const calculateAvgSpeed = (event) => {
    event.preventDefault();
    const totalSeconds = hours * 3600 + minutes * 60 + parseInt(seconds);
    const speed = distance / (totalSeconds / 3600);
    const pace = totalSeconds / 60 / distance;
    setSpeed(speed.toFixed(2));
    setPace(pace.toFixed(2));
    localStorage.setItem("speed", speed);
    localStorage.setItem("pace", pace);
  };

  const calculateCalories = (event) => {
    event.preventDefault();
    const caloriesBurned = 1.036 * weight * distance2;
    setCalories(caloriesBurned.toFixed(2));
    localStorage.setItem("calories", caloriesBurned);
  };

  const calculateMAS = (event) => {
    event.preventDefault();
    const mas = weight2 / ((height / 100) * (height / 100));
    setMas(mas.toFixed(2));
    localStorage.setItem("mas", mas);
  };

  const calculateHRZ = (event) => {
    event.preventDefault();

    // Assuming maximalHR and restingHR are state variables or defined elsewhere
    // Convert restingHR to a number
    const restingHRNumber = parseFloat(restingHR); // Use parseFloat to handle decimal numbers if needed

    if (!isNaN(maximalHR) && !isNaN(restingHRNumber)) {
      const fcReserve = maximalHR - restingHRNumber;

      // Calculate and set each heart rate zone
      setFc60(Math.round(restingHRNumber + 0.6 * fcReserve));
      setFc65(Math.round(restingHRNumber + 0.65 * fcReserve));
      setFc75(Math.round(restingHRNumber + 0.75 * fcReserve));
      setFc85(Math.round(restingHRNumber + 0.85 * fcReserve));
      setFc95(Math.round(restingHRNumber + 0.95 * fcReserve));
      setFc100(maximalHR);
      localStorage.setItem("fc65", fc65);
      localStorage.setItem("fc75", fc75);
      localStorage.setItem("fc85", fc85);
      localStorage.setItem("fc95", fc95);
      localStorage.setItem("fc100", fc100);
    }
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
        <h2>Calories burned during race</h2>
        <form onSubmit={calculateCalories}>
          <label htmlFor="weight">Weight (in kg)</label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <label htmlFor="distance2">Distance (in km)</label>
          <input
            type="number"
            id="distance2"
            name="distance2"
            value={distance2}
            onChange={(e) => setDistance2(e.target.value)}
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
          <label htmlFor="weight2">Weight (in kg)</label>
          <input
            type="number"
            id="weight2"
            name="weight2"
            value={weight2}
            onChange={(e) => setWeight2(e.target.value)}
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
        <h2>Calculate your heart rate zones</h2>
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
          <thead>
            <tr>
              <th>Zone</th>
              <th>Percentage</th>
              <th>Heart rate range</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>60-65%</td>
              <td>
                {fc60}-{fc65}
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>65-75%</td>
              <td>
                {fc65}-{fc75}
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>75-85%</td>
              <td>
                {fc75}-{fc85}
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>85-95%</td>
              <td>
                {fc85}-{fc95}
              </td>
            </tr>
            <tr>
              <td>5</td>
              <td>95-100%</td>
              <td>
                {fc95}-{fc100}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Calculator;
