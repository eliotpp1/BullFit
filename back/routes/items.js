const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

// GET all items
router.get("/", (req, res) => {
  Item.find()
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error: " + err));
});

// POST a new item
router.post("/add", (req, res) => {
  const newItem = new Item({ name: req.body.name });

  newItem
    .save()
    .then(() => res.json("Item added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
