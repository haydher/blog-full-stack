const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
 res.send({ success: "success" });
});

router.post("/:param", async (req, res) => {
 res.status(200).send({ status: 200 });
});

module.exports = router;
