const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024,
  },
  stats: {
    mas: {
      type: Number,
      required: true,
    },
    fc65: {
      type: Number,
      required: true,
    },
    fc75: {
      type: Number,
      required: true,
    },
    fc85: {
      type: Number,
      required: true,
    },
    fc95: {
      type: Number,
      required: true,
    },
    fc100: {
      type: Number,
      required: true,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
