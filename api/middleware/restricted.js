const { jwtSecrets } = require("../../config/secrets");
const jwt = require("jsonwebtoken");

const restrict = (req, res, next) => {
  const token = req.headers.authorization;

  !token
    ? res.status(401).json("Token required")
    : jwt.verify(token, jwtSecrets, (err, decoded) => {
        if (err) {
          res.status(401).json("Token invalid" + err.message);
        } else {
          req.decodedToken = decoded;
          next();
        }
      });
  //
  /*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */
};
module.exports = restrict;
