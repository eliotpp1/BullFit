const express = require("express");
const router = express.Router();
const Workout = require("../models/Workout");

// GET all workouts
router.get("/find", (req, res) => {
  Workout.find()
    .then((workouts) => res.json(workouts))
    .catch((err) => res.status(400).json({ error: err.message }));
});

// GET workout details by ID
router.get("/details/:id", (req, res) => {
  const workoutId = req.params.id;

  Workout.findById(workoutId)
    .then((workout) => {
      if (!workout) {
        return res.status(404).json({ error: "Workout not found" });
      }
      res.json(workout);
    })
    .catch((err) => res.status(400).json({ error: err.message }));
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
    .catch((err) => res.status(400).json({ error: err.message }));
});

module.exports = router;
