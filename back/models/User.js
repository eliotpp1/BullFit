const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
