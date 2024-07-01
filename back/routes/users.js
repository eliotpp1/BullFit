const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET tous les utilisateurs
router.get("/", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Erreur : " + err));
});

// POST un nouvel utilisateur
router.post("/add", (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({ username, password });

  newUser
    .save()
    .then(() => res.json("Utilisateur ajouté !"))
    .catch((err) => res.status(400).json("Erreur : " + err));
});

// GET toutes les données de l'utilisateur
router.get("/getData", async (req, res) => {
  const username = req.query.username; // Récupère le nom d'utilisateur à partir de la chaîne de requête
  if (!username) return res.status(400).send("Le nom d'utilisateur est requis");

  try {
    const user = await User.findOne({ username: username });
    if (!user) return res.status(404).send("Utilisateur non trouvé");
    res.send(user);
  } catch (err) {
    res
      .status(500)
      .send("Erreur lors de la récupération des données de l'utilisateur");
  }
});

module.exports = router;
