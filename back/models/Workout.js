//model workout
const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
  },
  duration: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    required: true,
    minlength: 6,
  },
  sport: {
    type: String,
    required: true,
    enum: [
      "running",
      "cycling",
      "swimming",
      "strength training",
      "yoga",
      "pilates",
      "stretching",
      "meditation",
      "rowing",
    ],
  },
  intensity: {
    type: String,
    required: true,
    enum: ["low", "moderate", "high"],
  },
  difficulty: {
    type: String,
    required: true,
    enum: ["beginner", "intermediate", "advanced"],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Workout", workoutSchema);
