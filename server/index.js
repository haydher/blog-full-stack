const express = require("express");
const cors = require("cors");
const app = express();
const login = require("./routes/login");

app.use(express.json());
app.use(
 //this mean we don't need to use body-parser anymore
 express.urlencoded({
  extended: true,
 })
);
app.use(cors());

app.use("/login", login);

app.get("/", (req, res) => {
 res.send("hello world");
});

const port = 5500;
app.listen(port, () => console.log(`Listening on port: ${port}`));
