import React, { useState, useContext, useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authcontext";
import { FaArrowLeft } from "react-icons/fa";

const WorkoutsFind = () => {
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState([]);
  const [search, setSearch] = useState("");
  const { connected } = useContext(AuthContext);
  const maxDescriptionLength = 50; // Limite de caractères pour la description

  const { isLoading, isError, data, error } = useQuery("workouts", async () => {
    const response = await axios.get("http://localhost:5000/workouts/find");
    return response.data;
  });

  useEffect(() => {
    if (data) {
      setWorkouts(data);
    }
  }, [data]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (!data) return; // Éviter le traitement si les données ne sont pas encore récupérées

    if (search.trim() === "") {
      setWorkouts(data); // Réinitialiser tous les entraînements si la recherche est vide
    } else {
      const filteredWorkouts = data.filter((workout) =>
        workout.name.toLowerCase().includes(search.toLowerCase())
      );
      setWorkouts(filteredWorkouts);
    }
  }, [data, search]);

  const handleNavigation = (workoutId) => {
    navigate(`/workouts/${workoutId}`);
  };

  // Fonction pour limiter la longueur de la description
  const truncateDescription = (description) => {
    if (description.length > maxDescriptionLength) {
      return description.substring(0, maxDescriptionLength) + "...";
    }
    return description;
  };

  return (
    <main id="main-content">
      <section className="workouts-find">
        <button
          onClick={() => navigate("/workouts")}
          className="workouts-find__button"
        >
          <FaArrowLeft />
        </button>
        <h1 className="workouts-find__title">Find a workout</h1>
        <form className="workouts-find__form">
          <input
            type="text"
            name="search"
            value={search}
            onChange={handleSearchChange}
            className="workouts-find__input"
            placeholder="Search for a workout"
          />
        </form>
        <div className="workouts-find__container">
          {isLoading && <span>Loading...</span>}
          {isError && <span>Error: {error.message}</span>}
          {!isLoading &&
            !isError &&
            workouts.map((workout) => (
              <div key={workout._id} className="workouts-find__workout">
                <h2 className="workouts-find__workout-title">{workout.name}</h2>
                <p className="workouts-find__workout-description">
                  {truncateDescription(workout.description)}
                </p>
                <button
                  onClick={() => handleNavigation(workout._id)}
                  className={`button-contained-icons btn--details ${
                    !connected ? "button-disabled" : ""
                  }`}
                  disabled={!connected}
                >
                  Details
                </button>
              </div>
            ))}
        </div>
        {!connected && (
          <p className="workouts-find__warning">
            You must be connected to see the details of a workout
          </p>
        )}
      </section>
    </main>
  );
};

export default WorkoutsFind;
