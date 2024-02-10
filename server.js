const express = require("express");

const app = express();
const port = 3000;

//base route
app.get("/", (req, res) => {
  console.log("Yes, I'm running");
  res.send("Hello World");
});

app.listen(port, () => {
  console.log("Server is running on port ", port, " :) ");
});
