const UserModels = require("../users/user-models");

const validateAuth = async (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({ message: "Username and password required" });
  } else if (!req.body) {
    res.status(400).json({ message: "Missing user data for sign-in" });
  } else {
    next();
  }
};

const checkUsernameInDB = async (req, res, next) => {
  try {
    const check = await UserModels.findBy({ username: req.body.username });
    if (!check.length) {
      next();
    } else {
      res.status(401).json("Username taken");
    }
  } catch (err) {
    res.status(500).json(`Server error: ${err}`);
  }
};

module.exports = {
  validateAuth,
  checkUsernameInDB,
};
