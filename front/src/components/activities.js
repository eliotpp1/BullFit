import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./context/authcontext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
      console.log(STRAVA_CLIENT_ID);
      console.log(STRAVA_CLIENT_SECRET);
      console.log(STRAVA_REDIRECT_URI);
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
    } catch (err) {
      setError("Error fetching activities");
    } finally {
      setLoading(false);
    }
  };

  const handleConnectStrava = () => {
    window.location.href = STRAVA_AUTH_URL;
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
              <li key={activity.id}>{activity.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Activities;
