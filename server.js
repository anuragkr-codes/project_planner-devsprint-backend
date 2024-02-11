const express = require("express");
const mongoose = require("mongoose");
const signupRoute = require("./routes/signupRoute");
const loginRoute = require("./routes/loginRoute");

const app = express();
const port = 3000;

//connection to the database
const dbURI =
  "mongodb+srv://anshsrivastava2004:Xl4Ky6SuAUUagkCM@devsprint.qmrvtan.mongodb.net/";

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log(`Connected to MongoDB at ${dbURI}`);
});

db.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

//database done

//Middleware
app.use(express.json());

//base route
app.get("/", (req, res) => {
  console.log("Yes, I'm running");
  res.send("Hello World");
});

app.use("/signup", signupRoute);
app.use("/login", loginRoute);

app.listen(port, () => {
  console.log("Server is running on port ", port, " :) ");
});
