const express = require('express');
const router = express.Router();

const main = require("./main/index");

router.use("/main", main);


module.exports = router;