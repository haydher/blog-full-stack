const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.get("/", (req, res) => {
 res.send({ success: "success" });
});

router.post("/:param", async (req, res) => {
 if (req.params?.param === "signup") await newUser(req.body);
 // if (req.params?.param === "login") getUser(req.body);
 res.status(200).send({ status: 200 });
});

const newUser = async (user) => {
 const newUser = new User({
  ...user,
 });

 newUser
  .save()
  .then((results) => {
   console.log(`User saved to db: ${results}`);
  })
  .catch((err) => console.log(`Error saving user to DB ${err}`));
};

module.exports = router;
