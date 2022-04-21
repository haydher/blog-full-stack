const express = require("express");
const router = express.Router();

const posts = [
 {
  id: 1,
  title: "hello 1",
  post:
   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia recusandae ipsam laboriosam sit. Nulla culpa, at repellat dolore doloribus eveniet nobis magni saepe, quam quasi obcaecati, vel exercitationem expedita esse?",
 },
 {
  id: 2,
  title: "hello 2",
  post:
   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia recusandae ipsam laboriosam sit. Nulla culpa, at repellat dolore doloribus eveniet nobis magni saepe, quam quasi obcaecati, vel exercitationem expedita esse?",
 },
 {
  id: 3,
  title: "hello 3",
  post:
   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia recusandae ipsam laboriosam sit. Nulla culpa, at repellat dolore doloribus eveniet nobis magni saepe, quam quasi obcaecati, vel exercitationem expedita esse?",
 },
 {
  id: 4,
  title: "hello 4",
  post:
   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia recusandae ipsam laboriosam sit. Nulla culpa, at repellat dolore doloribus eveniet nobis magni saepe, quam quasi obcaecati, vel exercitationem expedita esse?",
 },
];

router.get("/", (req, res) => {
 res.status(200).send(posts);
});

router.post("/", (req, res) => {
 console.log("req.body", req.body);
 console.log("req.body", req.body.length);

 posts.push({ ...req.body, id: posts.length + 1 });

 res.status(200).send(posts);
});

module.exports = router;
