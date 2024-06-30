//home component
import React from "react";
import { useNavigate } from "react-router-dom";
import MenRunning from "./../assets/images/Fitness-stats-rafiki.webp";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <main id="main-content">
      <section className="home">
        <h1 className="home__title">Get fit with Bull'Fit</h1>
        <div className="home__container">
          <div className="home__left">
            <p className="home__description">
              Get fit with Bull'Fit, the best website to help you to get fit and
              to stay fit. We offer you a running calculator to help you to
              improve your running skills, a workouts library to help you to
              find the best workouts for you and a personal workout to create
              your own workout.
            </p>
          </div>
          <div className="home__line-vertical"></div>
          <div className="home__right">
            <img alt="men running" src={MenRunning}></img>
          </div>
        </div>
      </section>
      <div className="container">
        <section className="running-calculator">
          <h2 className="running-calculator__title">Running calculator</h2>
          <p className="running-calculator__description">
            With our running calculator, you can calculate your pace, your
            speed, your distance or your time. You can also calculate your VO2
            max and your BMI. You can also calculate your heart rate zones and
            your calories burned.
          </p>
          <button
            onClick={() => handleNavigation("/calculator")}
            className="btn btn--calculate"
          >
            Calculate
          </button>
        </section>

        <section className="workouts-library">
          <h2 className="workouts-library__title">Workouts library</h2>
          <p className="workouts-library__description">
            With our workouts library, you can find the best workouts for you.
            You can find workouts for running, cycling, swimming, strength
            training, yoga, pilates, stretching, meditation and more.
          </p>
          <button
            onClick={() => handleNavigation("/")}
            className="btn btn--find"
          >
            Find a workout
          </button>
        </section>

        <section className="personal-workout">
          <h2 className="personal-workout__title">Personal workout</h2>
          <p className="personal-workout__description">
            With our personal workout, you can create your own workout. You can
            choose the type of workout, the duration, the intensity, the
            difficulty and the equipment. You can also add your own exercises
            and your own workouts.
          </p>
          <button
            onClick={() => handleNavigation("/")}
            className="btn btn--create"
          >
            Create a workout
          </button>
        </section>

        <section className="flow">
          <h2 className="flow__title">Flow</h2>
          <p className="flow__description">
            With our flow, you can follow your workouts and your progress. You
            can also follow your friends and your family. You can also share
            your workouts and your progress with your friends and your family.
          </p>
          <button
            onClick={() => handleNavigation("/")}
            className="btn btn--follow"
          >
            Follow your flow
          </button>
        </section>
      </div>
    </main>
  );
};

export default Home;
