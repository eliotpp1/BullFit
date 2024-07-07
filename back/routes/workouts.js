const express = require("express");
const router = express.Router();
const Workout = require("../models/Workout");

// GET all workouts
router.get("/find", (req, res) => {
  Workout.find()
    .then((workouts) => res.json(workouts))
    .catch((err) => res.status(400).json("Error: " + err));
});

// POST a new workout
router.post("/create", (req, res) => {
  const { name, duration, description, sport, intensity, difficulty, author } =
    req.body;

  const newWorkout = new Workout({
    name,
    duration,
    description,
    sport,
    intensity,
    difficulty,
    author,
  });

  newWorkout
    .save()
    .then(() => res.json("Workout added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
