const User = require("../models/userModel");

const signUpUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    res.status(200).json({ email, user });

    console.log(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  res.json({ msg: "login req received" });
};

module.exports = { signUpUser, loginUser };
