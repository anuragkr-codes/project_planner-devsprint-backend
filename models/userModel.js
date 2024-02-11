const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: Number, required: false },
  DOB: { type: Date, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  skills: { type: [String], required: false },
  projects: { type: [mongoose.SchemaTypes.ObjectId], required: false },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
