require("dotenv").config();

//require
const express = require("express");
const mongoose = require("mongoose");

const workoutRoute = require("./routes/workouts");
const userRoute = require("./routes/user");

//start the app
const app = express();
app.use(express.json());
app.use("/api/workouts", workoutRoute);
app.use("/api/user", userRoute);

//connect to db
mongoose
  .connect(process.env.MONGO_URI) //returns a promise
  .then(() => {
    console.log("connected to database"); //at first we want to connect & then listen.
    app.listen(process.env.PORT, () => {
      console.log("listening to port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

//this is for testing purpose
// app.use("/taba", (req, res, next) => {
//   res.send("developed by winterDark");
//   console.log(req.path, req.method);
//   next();
// });
