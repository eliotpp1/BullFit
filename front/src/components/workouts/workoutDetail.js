import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import {
  FaArrowLeft,
  FaCircle,
  FaClock,
  FaRunning,
  FaBiking,
  FaSwimmer,
  FaWalking,
  FaHiking,
  FaWater,
  FaDumbbell,
} from "react-icons/fa";

const WorkoutDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Récupère l'ID de l'activité depuis l'URL
  const { isLoading, isError, data, error } = useQuery(
    ["workout", id],
    async () => {
      const response = await axios.get(
        `http://localhost:5000/workouts/details/${id}`
      );
      return response.data;
    }
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const handleNavigateBack = () => {
    navigate("/workouts/find");
  };

  // Fonction pour afficher l'icône de sport correspondante
  const renderSportIcon = (sport) => {
    switch (sport.toLowerCase()) {
      case "running":
        return <FaRunning />;
      case "cycling":
        return <FaBiking />;
      case "swimming":
        return <FaSwimmer />;
      case "strength training":
        return <FaDumbbell />;
      case "yoga":
        return <FaWalking />;
      case "pilates":
        return <FaWalking />;
      case "stretching":
        return <FaWalking />;
      case "meditation":
        return <FaWalking />;
      case "rowing":
        return <FaWater />;

      default:
        return null;
    }
  };

  // Fonction pour afficher les cercles d'intensité
  const renderIntensityCircles = (intensity) => {
    switch (intensity.toLowerCase()) {
      case "low":
        return (
          <>
            <FaCircle style={{ color: "#28a745", marginRight: "4px" }} />
          </>
        );
      case "moderate":
        return (
          <>
            <FaCircle style={{ color: "#ffc107", marginRight: "4px" }} />
            <FaCircle style={{ color: "#ffc107", marginRight: "4px" }} />
          </>
        );
      case "high":
        return (
          <>
            <FaCircle style={{ color: "#dc3545", marginRight: "4px" }} />
            <FaCircle style={{ color: "#dc3545", marginRight: "4px" }} />
            <FaCircle style={{ color: "#dc3545", marginRight: "4px" }} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <main id="main-content">
      <section className="workout-details">
        <button
          onClick={() => navigate("/workouts")}
          className="workouts-find__button"
        >
          <FaArrowLeft />
        </button>
        <div className="workout-details__header">
          <h1 className="workout-details__title">{data.name}</h1>
        </div>
        <div className="workout_details__content">
          <p className="workout-details__description">{data.description}</p>

          <div className="workout-details__info">
            <div>
              <div className="workout-details__info-item">
                <div>
                  <span className="workout-details__info-label">Sport:</span>

                  <span className="workout-details__info-icon">
                    {renderSportIcon(data.sport)}
                  </span>
                </div>
                <span className="workout-details__info-text">{data.sport}</span>
              </div>
              <div className="workout-details__info-item">
                <div>
                  <span className="workout-details__info-label">Duration:</span>

                  <span className="workout-details__info-icon">
                    <FaClock />
                  </span>
                </div>
                <span className="workout-details__info-text">
                  {data.duration} minutes
                </span>
              </div>
            </div>
            <div>
              <div className="workout-details__info-item">
                <span className="workout-details__info-label">Intensity:</span>
                <span className="workout-details__info-icons">
                  {renderIntensityCircles(data.intensity)}
                </span>
              </div>
              <div className="workout-details__info-item">
                <span className="workout-details__info-label">Difficulty:</span>
                <span className="workout-details__info-text">
                  {data.difficulty}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default WorkoutDetails;
