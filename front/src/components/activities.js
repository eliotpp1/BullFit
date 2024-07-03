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

const Activities = () => {
  const { connected } = useContext(AuthContext);
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!connected) {
      console.log("Not connected");
    }
  }, [connected, navigate]);

  const handleConnectStrava = () => {
    window.location = "http://localhost:5000/users/auth";
  };

  const fetchActivities = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/users/activities",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "strava_access_token"
            )}`,
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
      const { access_token } = response.data;
      localStorage.setItem("strava_access_token", access_token);
      fetchActivities();
    } catch (err) {
      setError("Error exchanging token");
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
      default:
        return <FaRunning />; // Icone par défaut si le type n'est pas reconnu
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
      {error && <p>{error}</p>}
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
