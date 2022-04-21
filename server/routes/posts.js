const express = require("express");
const router = express.Router();

const Post = require("../models/post");

router.get("/", (req, res) => {
 res.status(200).send(posts);
});

router.post("/", async (req, res) => {
 console.log("req.body", req.body);
 console.log("req.body", req.body.length);

 const verifyPostRes = verifyPost(req.body);
 if (verifyPostRes.status !== 200) return verifyPostRes;

 const response = await newPost(req.body);

 if (response.status !== 200) return res.status(400).send(response);
 return res.status(200).send(response);
});

const verifyPost = (userPost) => {
 if (!userPost.title || !userPost.post || userPost.title.length < 2 || userPost.post.length < 10)
  return { status: 400, response: "Invalid data" };
 return { status: 200 };
};

const newPost = async (post) => {
 const newPost = new Post(...post);

 const res = await newPost.save();

 if (!res || res === undefined) return { status: 400, response: "Failed to submit post" };
 return { status: 200, response: res };
};

module.exports = router;
