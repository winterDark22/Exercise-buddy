const express = require("express");

const router = express.Router();

const {
  createNewWorkout,
  getAllWorkout,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controller/workoutController");

const requireAuth = require("../middleware/requireAuth");

//all the routes in this file will be protected by requireAuth middleware. token chara konotai access pabe na
router.use(requireAuth);

//GET all workouts
router.get("/", getAllWorkout);

//GET a single workout
router.get("/:id", getWorkout);

//POST a new workout
router.post("/", createNewWorkout);

//DELETE a workout
router.delete("/:id", deleteWorkout);

//UPDATE a workout
router.patch("/:id", updateWorkout);

//export this router to other files
module.exports = router;
