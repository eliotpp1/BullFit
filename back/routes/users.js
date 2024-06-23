const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET all users
router.get("/", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

// POST a new user
router.post("/add", (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({ username, password });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
