const express = require("express");

const router = express.Router();

const { signUpUser, loginUser } = require("../controller/userController");

//login a user
router.post("/login", loginUser);

//signup a new user
router.post("/signup", signUpUser);

//export this router to other files
module.exports = router;
