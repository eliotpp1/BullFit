// form component for creating a new workout

import React, { useState, useContext } from "react";
import { AuthContext } from "../context/authcontext";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

const WorkoutsCreate = () => {
  const { connected } = useContext(AuthContext);
  const navigate = useNavigate();

  const [workout, setWorkout] = useState({
    title: "",
    description: "",
    duration: "",
    distance: "",
    type: "",
    date: "",
    author: connected ? connected.id : "",
  });

  const handleChange = (e) => {
    setWorkout({ ...workout, [e.target.name]: e.target.value });
  };

  const mutation = useMutation(
    async () => {
      const response = await fetch("http://localhost:5000/workouts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(workout),
      });
      return response.json();
    },
    {
      onSuccess: () => {
        navigate("/workouts");
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <main id="main-content">
      <section className="workouts-create">
        <h1 className="workouts-create__title">Create a workout</h1>
        <form onSubmit={handleSubmit} className="workouts-create__form">
          <label htmlFor="title" className="workouts-create__label">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={workout.title}
            onChange={handleChange}
            className="workouts-create__input"
          />
          <label htmlFor="description" className="workouts-create__label">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={workout.description}
            onChange={handleChange}
            className="workouts-create__input"
          />
          <label htmlFor="duration" className="workouts-create__label">
            Duration
          </label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={workout.duration}
            onChange={handleChange}
            className="workouts-create__input"
          />
          <label htmlFor="distance" className="workouts-create__label">
            Distance
          </label>
          <input
            type="text"
            id="distance"
            name="distance"
            value={workout.distance}
            onChange={handleChange}
            className="workouts-create__input"
          />
          <label htmlFor="type" className="workouts-create__label">
            Type
          </label>
          <input
            type="text"
            id="type"
            name="type"
            value={workout.type}
            onChange={handleChange}
            className="workouts-create__input"
          />
          <label htmlFor="date" className="workouts-create__label">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={workout.date}
            onChange={handleChange}
            className="workouts-create__input"
          />
          <button type="submit" className="btn btn--create">
            Create
          </button>
        </form>
      </section>
    </main>
  );
};

export default WorkoutsCreate;
