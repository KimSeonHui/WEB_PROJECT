const express = require('express');
const router = express.Router();
/*
board : board list func
create : write post func
user : login, logout func
read : read post func
search : search post func
delete_process : delete post func
update : update, modify post func
upload : file, image upload func
setting : admin setting page func
*/
const main = require('./main/index');
const board = require('./board/index');
const create = require('./board/create/index');
const user = require('./user/index');
const login = require('./user/login/index');
const read = require('./board/read/index');
const search = require('./board/search/index');
const delete_process = require('./board/delete/index');
const update = require('./board/update/index');
const upload = require('./board/upload/index');
const setting = require('./setting/index');
const category = require('./setting/category/index');
const post = require('./setting/post/index');
const setUser = require('./setting/user/index');
const withdrawal = require('./user/withdrawal/index');
const findPW = require('./user/findPW/index');

router.use('/', main);
router.use('/main', main);
router.use('/board', board);
router.use('/create', create);
router.use('/user', user);
router.use('/user/login', login);
router.use('/read', read);
router.use('/search', search);
router.use('/delete', delete_process);
router.use('/update', update);
router.use('/upload', upload);
router.use('/setting', setting);
router.use('/setting/category', category);
router.use('/setting/post', post);
router.use('/setting/user', setUser);
router.use('/user/withdrawal', withdrawal);
router.use('/user/findPW', findPW);

module.exports = router;
