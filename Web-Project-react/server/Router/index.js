const express = require('express');
const router = express.Router();

const main = require("./main/index");
const board = require("./board/index");
const login = require("./user/login/index");
const user = require("./user/index");
const create = require("./board/create/index");
const read = require("./board/read/index");
const withdrawal = require("./user/withdrawal/index");
const findpw = require("./user/findPw/index");
const setting = require("./setting/index");
const category = require('./setting/category/index');
const post = require('./setting/post/index');
const settingUser = require('./setting/user/index');
const search = require('./board/search/index');
const upload = require('./board/upload/index');
const delete_process = require('./board/delete/index');
const update = require('./board/update/index');

router.use("/main", main);
router.use("/board", board);
router.use("/user/login", login);
router.use("/user", user);
router.use("/create", create);
router.use("/read", read);
router.use("/user/withdrawal", withdrawal);
router.use("/user/findpw", findpw);
router.use("/setting", setting);
router.use("/setting/category", category);
router.use("/setting/post", post);
router.use("/setting/user", settingUser);
router.use("/search", search);
router.use("/upload", upload);
router.use("/delete", delete_process);
router.use("/update", update);

module.exports = router;