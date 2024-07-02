import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./context/authcontext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaRunning,
  FaBiking,
  FaSwimmer,
  FaWalking,
  FaHiking,
} from "react-icons/fa";

const STRAVA_CLIENT_ID = 120280;
const STRAVA_CLIENT_SECRET = "7a74defbe9925602836ec5189ab127d0232a6922";
const STRAVA_REDIRECT_URI = "http://localhost:3000/activities";
const STRAVA_AUTH_URL = `https://www.strava.com/oauth/authorize?client_id=${STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${STRAVA_REDIRECT_URI}&approval_prompt=force&scope=read,activity:read_all`;

const Activities = () => {
  const { connected } = useContext(AuthContext);
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!connected) {
    }
  }, [connected, navigate]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      exchangeToken(code);
    }
  }, []);

  const exchangeToken = async (code) => {
    setLoading(true);
    try {
      const response = await axios.post("https://www.strava.com/oauth/token", {
        client_id: STRAVA_CLIENT_ID,
        client_secret: STRAVA_CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
      });
      const { access_token } = response.data;
      localStorage.setItem("strava_access_token", access_token);
      fetchActivities(access_token);
    } catch (err) {
      setError("Error exchanging token");
      setLoading(false);
    }
  };

  const fetchActivities = async (accessToken) => {
    try {
      const response = await axios.get(
        "https://www.strava.com/api/v3/athlete/activities",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setData(response.data);
      console.log(response.data);
    } catch (err) {
      setError("Error fetching activities");
    } finally {
      setLoading(false);
    }
  };

  const handleConnectStrava = () => {
    window.location.href = STRAVA_AUTH_URL;
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "Run":
        return <FaRunning />;
      case "Ride":
        return <FaBiking />;
      case "Swim":
        return <FaSwimmer />;
      case "Walk":
        return <FaWalking />;
      case "Hike":
        return <FaHiking />;
      default:
        return <FaRunning />; // Default icon if type is not matched
    }
  };

  const formatPace = (distance, elapsedTime) => {
    const distanceKm = distance / 1000;
    const timeMin = elapsedTime / 60;
    const paceMinPerKm = timeMin / distanceKm;

    const minutes = Math.floor(paceMinPerKm);
    const seconds = Math.round((paceMinPerKm - minutes) * 60);

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds} /km`;
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {!data && !loading && (
        <button onClick={handleConnectStrava}>Connect to Strava</button>
      )}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {data && (
        <div>
          <h2>Activities</h2>
          <ul>
            {data.map((activity) => (
              <>
                <li key={activity.id}>
                  {getActivityIcon(activity.type)} {activity.name}
                </li>
                <li>{(activity.elapsed_time / 60).toFixed(0)} min</li>
                <li>{activity.calories} kcal</li>
                <li>{activity.average_heartrate} bpm</li>
                <li>{formatPace(activity.distance, activity.moving_time)}</li>
              </>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Activities;
