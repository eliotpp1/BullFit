const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { loginValidation } = require("./../validation");

// Route de connexion
router.post("/login", async (req, res) => {
  // Valider les données de l'utilisateur
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Vérifier si l'utilisateur existe
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("User not found");

  // Vérifier le mot de passe
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid password");

  // Créer et assigner un jeton JWT
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: "1h",
  });
  res.header("auth-token", token).send(token);
});

// Route pour vérifier le jeton
router.get("/verify-token", async (req, res) => {
  const token = req.header("Authorization").split(" ")[1];
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findById(verified._id);
    if (!user) return res.status(400).send("User not found");

    res.send({ valid: true, user: user });
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
});

module.exports = router;
