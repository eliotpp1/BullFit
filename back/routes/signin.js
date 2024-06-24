const express = require("express");
const router = express.Router();
const User = require("../models/User");

// POST a new user
router.post("/add", (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
  });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
