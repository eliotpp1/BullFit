import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Utilisez useNavigate pour la navigation

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
  const [popup, setPopup] = useState(false);
  const navigate = useNavigate(); // Utilisez useNavigate pour la navigation

  const onChangeDistance = (e) => {
    setDistance(parseFloat(e.target.value));
  };

  const calculateAvgSpeed = (event) => {
    event.preventDefault();
    const totalSeconds = hours * 3600 + minutes * 60 + parseInt(seconds, 10);
    const speed = distance / (totalSeconds / 3600);
    const pace = totalSeconds / 60 / distance;
    setSpeed(speed.toFixed(2));
    setPace(pace.toFixed(2));
    localStorage.setItem("speed", speed.toFixed(2));
    localStorage.setItem("pace", pace.toFixed(2));
  };

  const calculateCalories = (event) => {
    event.preventDefault();
    const caloriesBurned = 1.036 * weight * distance2;
    setCalories(caloriesBurned.toFixed(2));
    localStorage.setItem("calories", caloriesBurned.toFixed(2));
  };

  const calculateMAS = (event) => {
    event.preventDefault();
    const mas = weight2 / ((height / 100) * (height / 100));
    setMas(mas.toFixed(2));
    localStorage.setItem("mas", mas.toFixed(2));
  };

  const calculateHRZ = (event) => {
    event.preventDefault();

    const restingHRNumber = parseFloat(restingHR);
    const maximalHRNumber = parseFloat(maximalHR);

    if (!isNaN(maximalHRNumber) && !isNaN(restingHRNumber)) {
      const fcReserve = maximalHRNumber - restingHRNumber;

      const newFc60 = Math.round(restingHRNumber + 0.6 * fcReserve);
      const newFc65 = Math.round(restingHRNumber + 0.65 * fcReserve);
      const newFc75 = Math.round(restingHRNumber + 0.75 * fcReserve);
      const newFc85 = Math.round(restingHRNumber + 0.85 * fcReserve);
      const newFc95 = Math.round(restingHRNumber + 0.95 * fcReserve);
      const newFc100 = maximalHRNumber;

      setFc60(newFc60);
      setFc65(newFc65);
      setFc75(newFc75);
      setFc85(newFc85);
      setFc95(newFc95);
      setFc100(newFc100);

      localStorage.setItem("fc60", newFc60);
      localStorage.setItem("fc65", newFc65);
      localStorage.setItem("fc75", newFc75);
      localStorage.setItem("fc85", newFc85);
      localStorage.setItem("fc95", newFc95);
      localStorage.setItem("fc100", newFc100);
    }
  };

  const popupSave = () => {
    setPopup(!popup);
  };

  useEffect(() => {
    setSpeed(localStorage.getItem("speed") || 0);
    setPace(localStorage.getItem("pace") || 0);
    setCalories(localStorage.getItem("calories") || 0);
    setMas(localStorage.getItem("mas") || 0);
    setFc60(localStorage.getItem("fc60") || 0);
    setFc65(localStorage.getItem("fc65") || 0);
    setFc75(localStorage.getItem("fc75") || 0);
    setFc85(localStorage.getItem("fc85") || 0);
    setFc95(localStorage.getItem("fc95") || 0);
    setFc100(localStorage.getItem("fc100") || 0);
  }, []);

  useEffect(() => {
    let counter = 0;
    if (parseFloat(speed) !== 0) counter++;
    if (parseFloat(pace) !== 0) counter++;
    if (parseFloat(calories) !== 0) counter++;
    if (parseFloat(mas) !== 0) counter++;
    if (parseInt(fc60) !== 0) counter++;
    if (counter >= 4) popupSave();
    console.log(counter);
  }, [speed, pace, calories, mas, fc60]);

  return (
    <>
      <div className="header-calc">
        <h1 className="header-calc-title">Running Calculator</h1>
        <p className="header-calc-subtitle">by BullFit</p>
      </div>

      {popup && (
        <div className="popup">
          <h2 className="popup-title">Save your results</h2>
          <p className="popup-message">Do you want to save your results?</p>
          <button
            onClick={() => navigate("/signin")}
            className="button-contained"
          >
            Sign In
          </button>
          <button onClick={popupSave} className="button-contained">
            No thanks
          </button>
        </div>
      )}

      <div className="section">
        <h2 className="section-title">Average speed and pace calculator</h2>
        <form onSubmit={calculateAvgSpeed} className="form">
          <label htmlFor="distance" className="form-label">
            Distance (in km)
          </label>
          <input
            type="number"
            id="distance"
            name="distance"
            value={distance}
            onChange={onChangeDistance}
            className="form-input"
          />
          <label htmlFor="hours" className="form-label">
            Hours
          </label>
          <input
            type="number"
            id="hours"
            name="hours"
            value={hours}
            onChange={(e) => setHours(parseInt(e.target.value, 10))}
            className="form-input"
          />
          <label htmlFor="minutes" className="form-label">
            Minutes
          </label>
          <input
            type="number"
            id="minutes"
            name="minutes"
            value={minutes}
            onChange={(e) => setMinutes(parseInt(e.target.value, 10))}
            className="form-input"
          />
          <label htmlFor="seconds" className="form-label">
            Seconds
          </label>
          <input
            type="number"
            id="seconds"
            name="seconds"
            value={seconds}
            onChange={(e) => setSeconds(parseInt(e.target.value, 10))}
            className="form-input"
          />
          <button type="submit" className="button-contained">
            Calculate
          </button>
        </form>
      </div>

      <div className="section-result">
        <h3 className="section-result-subtitle">Results</h3>
        <p>Speed: {speed} km/h</p>
        <p>Pace: {pace} min/km</p>
      </div>

      <div className="section">
        <h2 className="section-title">Calories burned during race</h2>
        <form onSubmit={calculateCalories} className="form">
          <label htmlFor="weight" className="form-label">
            Weight (in kg)
          </label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={weight}
            onChange={(e) => setWeight(parseFloat(e.target.value))}
            className="form-input"
          />
          <label htmlFor="distance2" className="form-label">
            Distance (in km)
          </label>
          <input
            type="number"
            id="distance2"
            name="distance2"
            value={distance2}
            onChange={(e) => setDistance2(parseFloat(e.target.value))}
            className="form-input"
          />
          <button type="submit" className="button-contained">
            Calculate
          </button>
        </form>
      </div>
      <div className="section-result">
        <h3 className="section-result-subtitle">Results</h3>
        <p>Calories burned: {calories}</p>
      </div>

      <div className="section">
        <h2 className="section-title">Calculate your MAS</h2>
        <form onSubmit={calculateMAS} className="form">
          <label htmlFor="weight2" className="form-label">
            Weight (in kg)
          </label>
          <input
            type="number"
            id="weight2"
            name="weight2"
            value={weight2}
            onChange={(e) => setWeight2(parseFloat(e.target.value))}
            className="form-input"
          />
          <label htmlFor="height" className="form-label">
            Height (in cm)
          </label>
          <input
            type="number"
            id="height"
            name="height"
            value={height}
            onChange={(e) => setHeight(parseFloat(e.target.value))}
            className="form-input"
          />
          <button type="submit" className="button-contained">
            Calculate
          </button>
        </form>
      </div>
      <div className="section-result">
        <h3 className="section-result-subtitle">Results</h3>
        <p>MAS: {mas}</p>
      </div>

      <div className="section">
        <h2 className="section-title">Calculate your heart rate zones</h2>
        <form onSubmit={calculateHRZ} className="form">
          <label htmlFor="restingHR" className="form-label">
            Resting heart rate
          </label>
          <input
            type="number"
            id="restingHR"
            name="restingHR"
            value={restingHR}
            onChange={(e) => setRestingHR(parseFloat(e.target.value))}
            className="form-input"
          />
          <label htmlFor="maximalHR" className="form-label">
            Maximal heart rate
          </label>
          <input
            type="number"
            id="maximalHR"
            name="maximalHR"
            value={maximalHR}
            onChange={(e) => setMaximalHR(parseFloat(e.target.value))}
            className="form-input"
          />
          <button type="submit" className="button-contained">
            Calculate
          </button>
        </form>
      </div>
      <div className="section-result">
        <h3 className="section-result-subtitle">Results</h3>
        <table className="section-results-table">
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
