const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { jwtSecrets } = require("../../config/secrets");

const Users = require("./user-models");

router.get("/", (req, res) => {
  Users.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
