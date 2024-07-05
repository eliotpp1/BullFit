// component for either find a workout or create a workout

import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authcontext";
import { useNavigate } from "react-router-dom";

const Workouts = () => {
  const { connected } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!connected) {
      console.log("Not connected");
    }
  }, [connected, navigate]);

  return (
    <main id="main-content">
      <section className="workouts">
        <h1 className="workouts__title">Workouts</h1>
        <div className="workouts__container">
          <div className="workouts__left">
            <p className="workouts__description">
              Find a workout or create a workout
            </p>
          </div>
          <div className="workouts__line-vertical"></div>
          <div className="workouts__right">
            <button
              onClick={() => navigate("/workouts/find")}
              className="btn btn--find"
            >
              Find a workout
            </button>
            <button
              onClick={() => navigate("/workouts/create")}
              className="btn btn--create"
            >
              Create a workout
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Workouts;
