const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
 res.send({ success: "success" });
});

router.post("/:param", (req, res) => {
 console.log(req.body);
 console.log(req.params);
 res.status(200).send({ status: 200 });
});

module.exports = router;
