const jwt = require("jsonwebtoken");

const authUser = (req, res, next) => {
 const token = req.header("Authorization");

 if (token === null) return res.status(400).send({ status: 401, response: "Invalid user token" });

 jwt.verify(token, process.env.JWT_TOKEN, (err, userId) => {
  if (err) return res.status(403).send({ status: 403, response: "Invalid user token" });

  req.userId = userId.userId;
  next();
 });
};

module.exports = authUser;
