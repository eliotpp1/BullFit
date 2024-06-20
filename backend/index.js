// backend/index.js
const express = require("express");
const app = express();
const port = 5000;

app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Hello from dfdsfsc");
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
