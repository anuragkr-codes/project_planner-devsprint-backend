const express = require("express");
const User = require("../models/userModel");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, phone, DOB, email, password, skills } = req.body;
    const existingUser = await User.findOne({ email });
    console.log("after finding");
    if (!existingUser) {
      const user = new User({ name, phone, DOB, email, password, skills });
      console.log(user);
      await user.save();
      console.log("user saved");
      res.status(201).send(user);
    } else {
      res.status(400).send("User already exists");
    }
  } catch (ex) {
    res.status(500).send(ex);
  }
});

module.exports = router;
