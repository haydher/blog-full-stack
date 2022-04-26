const express = require("express");
const authUser = require("../middleware/authUser");
const router = express.Router();

const Post = require("../models/post");
const User = require("../models/user");

const { verifyPost, newPost } = require("../utils");

router.get("/", authUser, async (req, res) => {
 const userAuth = req.userId;

 const user = await User.findById(userAuth);

 if (!user || user === undefined) return res.status(400).send({ status: 400, response: "No User found" });

 const posts = await Post.find().where("_id").in(user.posts).exec();

 if (!posts || posts === undefined) return res.status(400).send({ status: 400, response: "No posts found" });
 res.status(200).send({ status: 200, response: posts });
});

// /posts
router.post("/", authUser, async (req, res) => {
 const userAuth = req.userId;

 console.log("req.body", req.body);
 const verifyPostRes = verifyPost(req.body);
 if (verifyPostRes.status !== 200) return res.status(400).send(verifyPostRes);

 const response = await newPost(req.body, userAuth);

 // return all posts from user
 const user = await User.findById(userAuth);
 if (!user || user === undefined) return res.status(400).send({ status: 400, response: "No User found" });

 const posts = await Post.find().where("_id").in(user.posts).exec();

 if (response.status !== 200) return res.status(400).send(response);
 return res.status(200).send({ status: 200, response: posts });
});

module.exports = router;
