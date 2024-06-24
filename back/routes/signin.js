const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { signinValidation } = require("../validation");

router.post("/", async (req, res) => {
  // Valider les données avant de créer un utilisateur
  const { error } = signinValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Vérifier si l'utilisateur existe déjà dans la base de données
  const usernameExist = await User.findOne({ username: req.body.username });
  if (usernameExist) return res.status(400).send("Username already exists");

  // Hacher le mot de passe
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Créer un nouvel utilisateur
  const user = new User({
    username: req.body.username,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
