const express = require("express");
const router = express.Router();

const { verifyData, getUser, newUser } = require("../utils");

router.post("/:param", async (req, res) => {
 let response = null;

 // if user didnt enter the required field, reject it
 if (!verifyData(req.body)) return res.status(400).send({ status: 400, response: "Invalid data" });

 // add a new user to db
 if (req.params?.param === "signup") response = await newUser(req.body);

 // get the current user from db
 if (req.params?.param === "login") response = await getUser(req.body);

 if (response.status !== 200) return res.status(400).send(response);
 return res.status(200).set({ token: "text/plain" }).send(response);
});

module.exports = router;
