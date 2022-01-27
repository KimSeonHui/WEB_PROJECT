const express = require('express');
const router = express.Router();

const main = require("./main/index");
const board = require("./board/index");
const login = require("./user/index");

router.use("/main", main);
router.use("/board", board);
router.use("/login", login);

module.exports = router;