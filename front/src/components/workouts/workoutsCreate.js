import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/authcontext";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { FaArrowLeft } from "react-icons/fa";

const WorkoutsCreate = () => {
  const { connected, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [workout, setWorkout] = useState({
    name: "",
    duration: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
    sport: "running",
    intensity: "low",
    difficulty: "beginner",
    author: "",
  });

  const [notification, setNotification] = useState("");

  useEffect(() => {
    if (user) {
      setWorkout((prevWorkout) => ({ ...prevWorkout, author: user._id }));
    }
  }, [user]);

  useEffect(() => {
    if (notification) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [notification]);

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

      if (!response.ok) {
        throw new Error("Erreur lors de la création de l'exercice");
      }

      return response.json();
    },
    {
      onSuccess: () => {
        setNotification("Votre workout a été créé avec succès !");
        setTimeout(() => {
          setNotification("");
          navigate("/workouts/find");
        }, 3000);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!connected) {
      alert("Vous devez être connecté pour créer un exercice.");
      return;
    }
    mutation.mutate();
  };

  return (
    <main id="main-content">
      <section className="workouts-create">
        <button
          onClick={() => navigate("/workouts")}
          className="workouts-find__button"
        >
          <FaArrowLeft />
        </button>
        <h1 className="workouts-create__name">Create a workout</h1>
        {notification && <p className="notification">{notification}</p>}
        <form onSubmit={handleSubmit} className="workouts-create__form">
          <label htmlFor="name" className="workouts-create__label">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={workout.name}
            onChange={handleChange}
            className="workouts-create__input"
            required
          />
          <label htmlFor="duration" className="workouts-create__label">
            Duration (min)
          </label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={workout.duration}
            onChange={handleChange}
            className="workouts-create__input"
            required
          />
          <label htmlFor="description" className="workouts-create__label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={workout.description}
            onChange={handleChange}
            className="workouts-create__textarea"
            required
          ></textarea>
          <label htmlFor="sport" className="workouts-create__label">
            Sport
          </label>
          <select
            id="sport"
            name="sport"
            value={workout.sport}
            onChange={handleChange}
            className="workouts-create__input"
            required
          >
            <option value="running">Running</option>
            <option value="cycling">Cycling</option>
            <option value="swimming">Swimming</option>
            <option value="strength training">Strength training</option>
            <option value="yoga">Yoga</option>
            <option value="pilates">Pilates</option>
            <option value="stretching">Stretching</option>
            <option value="meditation">Meditation</option>
            <option value="rowing">Rowing</option>
          </select>
          <label htmlFor="intensity" className="workouts-create__label">
            Intensity
          </label>
          <select
            id="intensity"
            name="intensity"
            value={workout.intensity}
            onChange={handleChange}
            className="workouts-create__input"
            required
          >
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
          </select>
          <label htmlFor="difficulty" className="workouts-create__label">
            Difficulty
          </label>
          <select
            id="difficulty"
            name="difficulty"
            value={workout.difficulty}
            onChange={handleChange}
            className="workouts-create__input"
            required
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          {!connected && (
            <p className="workouts-find__warning">
              You must be connected to create a workout
            </p>
          )}
          <button
            type="submit"
            className={`button-contained ${
              !connected ? "button-disabled" : ""
            }`}
            disabled={!connected}
          >
            Create
          </button>
        </form>
      </section>
    </main>
  );
};

export default WorkoutsCreate;
