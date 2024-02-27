const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: Number, required: true },
  DOB: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: true },
  skills: { type: [String], required: false },
  projects: { type: [mongoose.SchemaTypes.ObjectId], required: false },
});

userSchema.pre("save", async function (next) {
  // Only hash the password if it's modified or a new user
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

// Example method to verify a password
userSchema.methods.verifyPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
