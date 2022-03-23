const express = require('express');
const router = express.Router();

const main = require("./main/index");
const board = require("./board/index");
const login = require("./user/login/index");
const signup = require("./user/index");
const create = require("./board/create/index");
const read = require("./board/read/index");

router.use("/main", main);
router.use("/board", board);
router.use("/user/login", login);
router.use("/signup", signup);
router.use("/create", create);
router.use("/read", read);

module.exports = router;