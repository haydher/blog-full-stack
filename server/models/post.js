const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userPost = new Schema(
 {
  title: {
   type: String,
   required: true,
  },
  post: {
   type: String,
   required: true,
  },
  author: {
   type: mongoose.Schema.Types.ObjectId,
   required: true,
  },
 },
 { timestamps: true }
);

const Post = mongoose.model("Post", userPost);

module.exports = Post;
