const router = require("express").Router();
const axios = require("axios");
const User = require("../models/User");

const STRAVA_CLIENT_ID = process.env.REACT_APP_STRAVA_CLIENT_ID;
const STRAVA_CLIENT_SECRET = process.env.REACT_APP_STRAVA_CLIENT_SECRET;
const STRAVA_REDIRECT_URI =
  process.env.REACT_APP_STRAVA_REDIRECT_URI ||
  "http://localhost:3000/activities";

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

    const { access_token } = response.data;

    // Stocker access_token dans la session ou la base de données associée à l'utilisateur

    res.json({ access_token });
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
