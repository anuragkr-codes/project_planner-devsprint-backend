const express = require("express");
const User = require("../models/userModel");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    console.log("after finding");
    if (!existingUser) {
      const user = new User({ name, phone, email, password });
      console.log(user);
      await user.save();
      console.log("user saved");
      res.status(200).json({ user: user });
      // res.status(200).json({ user: user.toObject() });
      console.log("Works");
    } else {
      res.status(400).send("User already exists");
    }
  } catch (ex) {
    res.status(500).send(ex);
  }
});

module.exports = router;
