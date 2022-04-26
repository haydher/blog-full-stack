const express = require("express");
const authUser = require("../middleware/authUser");
const router = express.Router();

const Post = require("../models/post");
const User = require("../models/user");

const { verifyPost, newPost } = require("../utils");

// /posts
router.get("/all", async (req, res) => {
 try {
  const posts = await Post.find().sort({ updatedAt: "desc" }).exec();
  if (!posts || posts === undefined) return res.status(400).send({ status: 400, response: "No posts found" });
  res.status(200).send({ status: 200, response: posts });
 } catch (error) {
  return res.status(400).send({ status: 400, response: "No posts found" });
 }
});

// /posts
router.get("/", authUser, async (req, res) => {
 const userAuth = req.userId;

 let user;
 try {
  user = await User.findById(userAuth);
 } catch (error) {
  return res.status(500).send({ status: 500, response: "Error getting the user" });
 }

 if (!user || user === undefined) return res.status(400).send({ status: 400, response: "No User found" });

 try {
  const posts = await Post.find().where("_id").in(user.posts).exec();
  if (!posts || posts === undefined) return res.status(400).send({ status: 400, response: "No posts found" });
  res.status(200).send({ status: 200, response: posts });
 } catch (error) {
  return res.status(400).send({ status: 400, response: "Error getting user posts" });
 }
});

// /posts
router.post("/", authUser, async (req, res) => {
 const userAuth = req.userId;

 const verifyPostRes = verifyPost(req.body);
 if (verifyPostRes.status !== 200) return res.status(400).send(verifyPostRes);

 let response;
 try {
  response = await newPost(req.body, userAuth);
 } catch (error) {
  return res.status(500).send({ status: 500, response: "Error making a new post" });
 }

 let user;
 try {
  user = await User.findById(userAuth);
  if (!user || user === undefined) return res.status(400).send({ status: 400, response: "No User found" });
 } catch (error) {
  return res.status(500).send({ status: 500, response: "Error making a new post" });
 }

 let posts;
 try {
  // return all posts from user
  posts = await Post.find().where("_id").in(user.posts).exec();
  return res.status(200).send({ status: 200, response: posts });
 } catch (error) {
  return res.status(200).send({ status: 200, response });
 }
});

module.exports = router;
