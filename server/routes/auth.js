const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.get("/", (req, res) => {
 res.send({ success: "success" });
});

router.post("/:param", async (req, res) => {
 let result = null;

 // if user didnt enter the required field, reject it
 if (!verifyBody(req.body)) return res.status(400).send({ status: 400 });

 // add a new user to db
 if (req.params?.param === "signup") result = await newUser(req.body);

 // get the current user from db
 if (req.params?.param === "login") result = await getUser(req.body);

 if (result === undefined || result === null) {
  return res.status(400).send({ status: 400, result: "User doesn't exist" });
 } else return res.status(200).send({ status: 200, result: result.username });
});

// verify user input
const verifyBody = (user) => {
 if (!user.username || user.username < 5 || !user.password || user.password < 5) return false;
 return true;
};

// get user
const getUser = async (user) => await User.findOne({ username: user.username });

// add new user to db
const newUser = async (user) => {
 // if user already exits, return
 const userExits = await getUser(user);
 if (userExits) return;

 const newUser = new User({
  ...user,
 });

 return await newUser.save();
};

module.exports = router;
