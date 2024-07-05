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
  const newWorkout = new Item({
    name: req.body.name,
    duration: req.body.duration,
    date: req.body.date,
    description: req.body.description,
    sport: req.body.sport,
    intensity: req.body.intensity,
    difficulty: req.body.difficulty,
    author: req.body.author,
  });

  newWorkout
    .save()
    .then(() => res.json("Workout added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
