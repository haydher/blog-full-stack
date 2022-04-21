const express = require("express");
const router = express.Router();

const posts = [
 {
  title: "hello 1",
  post: "post 1",
 },
 {
  title: "hello 2",
  post: "post 2",
 },
 {
  title: "hello 3",
  post: "post 3",
 },
 {
  title: "hello 4",
  post: "post 4",
 },
];

router.get("/", (req, res) => {
 res.status(200).send(posts);
});

module.exports = router;
