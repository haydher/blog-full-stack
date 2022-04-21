const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const auth = require("./routes/auth");
const post = require("./routes/posts");
const Post = require("./models/post");

require("dotenv").config();

app.use(express.json());
app.use(
 express.urlencoded({
  extended: true,
 })
);
app.use(cors());

// connect to db
const db = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@blogs.xtpsk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose
 .connect(db)
 .then(() => console.log("connect to db"))
 .catch((err) => console.log(`Error connecting to db ${err}`));

app.use("/auth", auth);
app.use("/posts", post);

app.get("/", (req, res) => {
 res.send("hello world");
});

app.get("/find/:id", async (req, res) => {
 const result = await Post.findById(req.params.id);
 console.log("res", result);
 res.send(result);
});

app.get("*", function (req, res) {
 res.send("404");
});

const port = 5500;
app.listen(port, () => console.log(`Listening on port: ${port}`));
