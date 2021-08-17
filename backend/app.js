const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const HttpError = require("./models/http-error");
const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE');
  next();
});

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

//error handling middleware
app.use((req, res, next) => {
  const error = new HttpError("could not find this route!", 404);
  throw error;
});

//error handling middleware (one with 4 inputs)
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500); //either the set code or default something went wrong
  res.json({ message: error.message || "Something went wrong." });
});

mongoose
  .connect(
    "mongodb+srv://Nick:7VeJxuDjpnoKZDLK@firstdb.jjhp4.mongodb.net/mern?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
