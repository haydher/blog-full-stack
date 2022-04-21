const express = require("express");
const router = express.Router();

const User = require("../models/user");
const bcrypt = require("bcryptjs");

router.get("/", (req, res) => {
 res.send({ success: "success" });
});

router.post("/:param", async (req, res) => {
 let response = null;

 // if user didnt enter the required field, reject it
 if (!verifyData(req.body)) return res.status(400).send({ status: 400, response: "Invalid data" });

 // add a new user to db
 if (req.params?.param === "signup") response = await newUser(req.body);

 // get the current user from db
 if (req.params?.param === "login") response = await getUser(req.body);

 if (response.status !== 200) {
  return res.status(400).send(response);
 } else return res.status(200).send(response);
});

// verify user input
const verifyData = (user) => {
 if (!user.username || user.username.length < 5 || !user.password || user.password.length < 5) return false;
 return true;
};

// get user
const getUser = async (user) => {
 const userFromDB = await User.findOne({ username: user.username });

 // verify if user exists
 if (!userFromDB || userFromDB == undefined) return { status: 400, result: "User doesn't exist" };

 // decrypt given password with encrypted password
 const comparePass = await bcrypt.compare(user.password, userFromDB.password);

 if (comparePass) return { status: 200, result: userFromDB.username };
 else return { status: 400, result: "Incorrect username or password" };
};

// add new user to db
const newUser = async (user) => {
 // if user already exits, return
 const userExits = await getUser(user);
 if (userExits.status === 200) return { status: 400, response: "User with that username already exists" };

 // add the user to db
 const newUser = new User({
  ...user,
 });

 // encrypt password
 // this generates a key value of 10 digits to decrypt the password after
 const salt = await bcrypt.genSalt(10);
 // this makes the password hashed so its not stored as a plain text
 newUser.password = await bcrypt.hash(newUser.password, salt);

 const res = await newUser.save();

 return { status: 200, response: res.username };
};

module.exports = router;
