const express = require("express");
const app = express();
const login = require("./routes/login");

app.use("/login", login);

app.get("/", (req, res) => {
 res.send("hello world");
});

const port = 5500;
app.listen(port, () => console.log(`Listening on port: ${port}`));
