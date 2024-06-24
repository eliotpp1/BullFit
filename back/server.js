const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const uri =
  "mongodb+srv://eliotpouplier:13Eliot13*!@cluster0.swqlcwb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
