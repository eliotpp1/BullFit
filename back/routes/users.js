const express = require("express");
const router = express.Router();
const axios = require("axios");
const User = require("../models/User");

const STRAVA_CLIENT_ID = process.env.REACT_APP_STRAVA_CLIENT_ID;
const STRAVA_CLIENT_SECRET = process.env.REACT_APP_STRAVA_CLIENT_SECRET;
const STRAVA_REDIRECT_URI =
  process.env.REACT_APP_STRAVA_REDIRECT_URI ||
  "http://localhost:3000/activities";

// Middleware pour gérer CORS
const cors = require("cors");
router.use(
  cors({
    origin: "http://localhost:3000", // Permettre les requêtes de cette origine
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
  })
);

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

// Route pour l'authentification avec Strava
router.get("/auth", (req, res) => {
  const redirect_uri = `https://www.strava.com/oauth/authorize?client_id=${STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${STRAVA_REDIRECT_URI}&scope=read,activity:read_all`;
  res.redirect(redirect_uri);
});

// Route de callback pour échanger le code contre un token d'accès
router.get("/auth/callback", async (req, res) => {
  const { code } = req.query;

  try {
    const response = await axios.post("https://www.strava.com/oauth/token", {
      client_id: STRAVA_CLIENT_ID,
      client_secret: STRAVA_CLIENT_SECRET,
      code,
      grant_type: "authorization_code",
    });

    const { access_token, refresh_token, expires_at } = response.data;

    // Stocker les tokens dans une base de données ou une session sécurisée
    res.json({ access_token, refresh_token, expires_at });
  } catch (err) {
    console.error("Error exchanging code for access token:", err);
    res.status(500).json({ error: "Failed to authenticate with Strava" });
  }
});

// Middleware pour vérifier l'authentification (exemple avec JWT)
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403); // Forbidden
  }
}

// Route pour récupérer les activités de l'utilisateur depuis Strava
router.get("/activities", verifyToken, async (req, res) => {
  const { token } = req;

  try {
    const activitiesResponse = await axios.get(
      "https://www.strava.com/api/v3/athlete/activities",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    res.json(activitiesResponse.data);
  } catch (err) {
    console.error("Error fetching activities from Strava:", err);
    res.status(500).json({ error: "Failed to fetch activities from Strava" });
  }
});

module.exports = router;
