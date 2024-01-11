const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET_TOKEN, { expiresIn: "2h" });
};

const signUpUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    const token = createToken(user._id); //user._id is the payload

    res.status(200).json({ email, token }); //we should send the jwt token with this response.
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password); //this user has the _id property which mongoose automatically adds to each document
    const token = createToken(user._id); //the _id is added when the user was first created

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

  //res.json({ msg: "login req received" });
};

module.exports = { signUpUser, loginUser };
