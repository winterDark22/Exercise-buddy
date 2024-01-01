const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//here in the workout schema, the first argument describes how the object looks like
// the second argument another obj which hold timestamp property
const workoutSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Workout", workoutSchema);
