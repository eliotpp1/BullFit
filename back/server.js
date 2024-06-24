const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = process.env.MONGO_URI; // Récupérer l'URI depuis les variables d'environnement
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Import routes
const itemsRouter = require("./routes/items");
app.use("/items", itemsRouter);

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

const signinRouter = require("./routes/signin");
app.use("/signin", signinRouter);

const loginRouter = require("./routes/login");
app.use("/login", loginRouter);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
