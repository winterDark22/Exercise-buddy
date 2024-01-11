const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers; //http headers are case insensitive. authorization isnt a keyword, its just a convention

  if (!authorization) {
    return res.status(401).json({ error: "authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    // the jwt.verify returns the payload of the token. payload is { _id: "some id"}
    const { _id } = jwt.verify(token, process.env.JWT_SECRET_TOKEN); //this _id is the user unique id given by mongodb

    // we will attach this with the req object so that we can use it in the next middleware
    // so, whatever req user made it should first pass this authorization middleware, then for the next work,
    // like creating workout or getting all workouts, we want explitcitly this user, how will we get that?
    // that's why we are attaching this user with the req object

    // we dont send the whole user info, just a shorter user version with only _id
    req.user = await User.findById({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: " req is not authorized" });
  }
};

module.exports = requireAuth;
