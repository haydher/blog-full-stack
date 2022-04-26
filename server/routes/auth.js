const express = require("express");
const router = express.Router();

const { verifyData, getUser, newUser } = require("../utils");

router.post("/:param", async (req, res) => {
 let response = null;

 // if user didnt enter the required field, reject it
 if (!verifyData(req.body)) return res.status(400).send({ status: 400, response: "Invalid data" });

 // verify param
 switch (req.params?.param) {
  // add a new user to db
  case "signup":
   response = await newUser(req.body);
   break;
  // get the current user from db
  case "login":
   response = await getUser(req.body);
   break;
  default:
   return res.status(404).send({ status: 404, response: "Invalid URL" });
 }

 if (response?.status !== 200) return res.status(400).send(response);
 return res.status(200).set({ token: "text/plain" }).send(response);
});

module.exports = router;
