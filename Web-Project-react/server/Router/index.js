const express = require('express');
const router = express.Router();

const main = require("./main/index");
const board = require("./board/index");
const login = require("./user/login/index");
const signin = require("./user/index");
const create = require("./board/create/index");

router.use("/main", main);
router.use("/board", board);
router.use("/user/login", login);
router.use("/signin", signin);
router.use("/create", create);
module.exports = router;