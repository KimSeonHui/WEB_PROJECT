const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const conn = mysql.createConnection({
    host : 'localhost',
    port : 3306,
    user: 'root',
    password : process.env.DB_PW,
    database : process.env.DB_NAME
});

conn.connect();

const handleQuery = (sql, values) => {
	return new Promise((resolve, reject) => {
		conn.query(sql, values, (err, rows) => {
			if(err) return reject(err);
			resolve(rows);
		})
	})
}

router.get('/', async (req, res) => {
    const key = req.query.key;

    let sql = `SELECT BOARDID, POSTID, TITLE, CREATER, DATE_FORMAT(ADDTIME, '%Y-%m-%d-%H : %i') 
    as ADDTIME FROM BOARD LEFT JOIN CATEGORY ON BOARD.BOARDID = CATEGORY.CID WHERE BOARD.TITLE LIKE '%${key}%';`

    const rows = await handleQuery(sql).catch((err) => {
        console.log(err);
        res.send('error');
    });

    res.send(rows);
});

router.get('/auto', async (req, res) => {
    const key = req.query.key;

    let sql = `SELECT BOARDID, POSTID, TITLE, CREATER, DATE_FORMAT(ADDTIME, '%Y-%m-%d-%H : %i') 
    as ADDTIME FROM BOARD LEFT JOIN CATEGORY ON BOARD.BOARDID = CATEGORY.CID WHERE BOARD.TITLE LIKE '%${key}%' LIMIT 10;`

    const rows = await handleQuery(sql).catch((err) => {
        console.log(err);
        res.send('error');
    });

    res.send(rows);
});

router.get('/multi', async (req, res) => {
    const key = req.query.key;

    let sql = `SELECT BOARDID, POSTID, TITLE, CREATER, DATE_FORMAT(ADDTIME, '%Y-%m-%d-%H : %i') 
    as ADDTIME FROM BOARD LEFT JOIN CATEGORY ON BOARD.BOARDID = CATEGORY.CID WHERE BOARD.TITLE LIKE '%${key}%';`

    const rows = await handleQuery(sql).catch((err) => {
        console.log(err);
        res.send('error');
    });

    res.send(rows);
});


module.exports = router;