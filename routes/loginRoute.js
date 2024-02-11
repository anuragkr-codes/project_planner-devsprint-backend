const express = require("express");
const User = require("../models/userModel");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const existingUser = await User.findOne({ email: email });
    console.log(existingUser);
    if (existingUser) {
      const isPasswordValid = await existingUser.verifyPassword(password);
      if (isPasswordValid) {
        res.status(200).send("Logged in successfully");
      } else {
        res.status(400).send("Incorrect Password");
      }
    } else {
      res.status(400).send("User not found, please login");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
