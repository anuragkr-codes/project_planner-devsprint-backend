const express = require("express");
const cors = require('cors'); // Add this line
const mongoose = require("mongoose");
const signupRoute = require("./routes/signupRoute");
const loginRoute = require("./routes/loginRoute");
const dashboardRoute = require("./routes/dashboardRoute");
const projectRoute = require("./routes/projectRoute");

const app = express();
const port = 3000;

// Connection to the database
const dbURI = "mongodb+srv://anshsrivastava2004:Xl4Ky6SuAUUagkCM@devsprint.qmrvtan.mongodb.net/";

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

// Middleware
app.use(express.json());
app.use(cors()); // Add this line

// Base route
app.get("/", (req, res) => {
  console.log("Yes, I'm running");
  res.send("Hello World");
});

app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/project", projectRoute);
app.use("/dashboard", dashboardRoute);

app.listen(port, () => {
  console.log("Server is running on port", port, ":)");
});
