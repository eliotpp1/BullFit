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
  FaWater,
  FaDumbbell,
} from "react-icons/fa";

const Activities = () => {
  const { connected } = useContext(AuthContext);
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!connected) {
      console.log("Not connected");
    } else {
      const accessToken = localStorage.getItem("strava_access_token");
      const refreshToken = localStorage.getItem("strava_refresh_token");
      const expiresAt = localStorage.getItem("strava_expires_at");

      if (accessToken && refreshToken && expiresAt) {
        if (new Date().getTime() / 1000 > expiresAt) {
          refreshAccessToken(refreshToken);
        } else {
          fetchActivities(accessToken);
        }
      } else {
        handleConnectStrava();
      }
    }
  }, [connected, navigate]);

  const handleConnectStrava = () => {
    window.location = "http://localhost:5000/users/auth";
  };

  const fetchActivities = async (accessToken) => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/users/activities",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setData(response.data);
    } catch (err) {
      setError("Error fetching activities");
    } finally {
      setLoading(false);
    }
  };

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
      const response = await axios.get(
        `http://localhost:5000/users/auth/callback?code=${code}`
      );
      const { access_token, refresh_token, expires_at } = response.data;
      localStorage.setItem("strava_access_token", access_token);
      localStorage.setItem("strava_refresh_token", refresh_token);
      localStorage.setItem("strava_expires_at", expires_at);
      fetchActivities(access_token);
    } catch (err) {
      setError("Error exchanging token");
      setLoading(false);
    }
  };

  const refreshAccessToken = async (refreshToken) => {
    try {
      const response = await axios.post("https://www.strava.com/oauth/token", {
        client_id: process.env.REACT_APP_STRAVA_CLIENT_ID,
        client_secret: process.env.REACT_APP_STRAVA_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      });
      const { access_token, refresh_token, expires_at } = response.data;
      localStorage.setItem("strava_access_token", access_token);
      localStorage.setItem("strava_refresh_token", refresh_token);
      localStorage.setItem("strava_expires_at", expires_at);
      fetchActivities(access_token);
    } catch (err) {
      setError("Error refreshing access token");
      setLoading(false);
    }
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
      case "Rowing":
        return <FaWater />;
      case "Workout":
        return <FaDumbbell />;

      default:
        return <FaRunning />;
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
    <div className="dashboard-activities">
      <h1>Dashboard</h1>
      {!data && !loading && (
        <button onClick={handleConnectStrava}>Connect to Strava</button>
      )}
      {loading && <p>Loading...</p>}
      {data && (
        <div className="activities">
          <h2>Activities</h2>
          <ul className="activity-list">
            {data.map((activity) => (
              <li key={activity.id} className="activity-card">
                <div className="activity-header">
                  <span className="activity-icon">
                    {getActivityIcon(activity.type)}
                  </span>
                  <span className="activity-title">{activity.name}</span>
                </div>
                <div className="activity-body">
                  <div className="activity-detail">
                    <span className="activity-label">Date</span>
                    <span>
                      {new Date(activity.start_date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="activity-detail">
                    <span className="activity-label">Time</span>
                    <span>{(activity.elapsed_time / 60).toFixed(0)} min</span>
                  </div>
                  <div className="activity-detail">
                    <span className="activity-label">Distance</span>
                    <span>{(activity.distance / 1000).toFixed(2)} km</span>
                  </div>
                  <div className="activity-detail">
                    <span className="activity-label">Heart Rate</span>
                    <span>{activity.average_heartrate} bpm</span>
                  </div>
                  {activity.type === "Run" && (
                    <div className="activity-detail">
                      <span className="activity-label">Pace</span>
                      <span>
                        {formatPace(activity.distance, activity.moving_time)}
                      </span>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Activities;
