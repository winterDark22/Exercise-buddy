const Workout = require("../models/workoutModel");

const mongoose = require("mongoose");

//get all workouts
const getAllWorkout = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });
  //.select("title reps load");

  // console.log(newWorkouts);
  res.status(200).json(workouts);
};

//get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid id, no such workout" });
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }
  res.status(200).json(workout);
};

//create a workout
const createNewWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  const emptyFields = [];
  if (!title) emptyFields.push("title");
  if (!load) emptyFields.push("load");
  if (!reps) emptyFields.push("reps");

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill up all fields", emptyFields });
  }

  try {
    //create a new workout in db
    const newWorkout = await Workout.create({
      title,
      load,
      reps,
    });

    res.status(200).json(newWorkout);
    //console.log(newWorkout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid id, no such workout" });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid id, no such workout" });
  }

  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

module.exports = {
  createNewWorkout,
  getAllWorkout,
  getWorkout,
  deleteWorkout,
  updateWorkout,
};
