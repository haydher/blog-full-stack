const express = require("express");
const router = express.Router();

const Post = require("../models/post");
const User = require("../models/user");

router.get("/", async (req, res) => {
 const userAuth = req.header("Authorization");
 const posts = await Post.find({ id: userAuth });

 console.log("posts", posts);

 if (!posts || posts === undefined) return res.status(400).send({ status: 400, response: "No posts found" });
 res.status(200).send({ status: 200, response: posts });
});

router.post("/", async (req, res) => {
 console.log("post");
 const userAuth = req.header("Authorization");

 const verifyPostRes = verifyPost(req.body);
 if (verifyPostRes.status !== 200) return res.status(400).send(verifyPostRes);

 const response = await newPost(req.body, userAuth);

 console.log("res", response);
 if (response.status !== 200) return res.status(400).send(response);
 return res.status(200).send(response);
});

const verifyPost = (userPost) => {
 if (!userPost.title || !userPost.post || userPost.title.length < 2 || userPost.post.length < 5)
  return { status: 400, response: "Invalid data" };
 return { status: 200 };
};

const newPost = async (post, author) => {
 const newPost = new Post({ ...post, author });

 const res = await newPost.save();

 const updateUser = await User.findOneAndUpdate({ _id: author }, { $push: { posts: newPost._id } });
 await updateUser.save();

 if (!res || res === undefined) return { status: 400, response: "Failed to submit post" };
 return { status: 200, response: res };
};

module.exports = router;
