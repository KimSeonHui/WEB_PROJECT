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

router.post('/', (req, res) => {
    console.log('delete');
    if(!req.session.passport) {
        res.send('notLogined');
    }
    else {
        const { bid, postid } = req.body;
        const uid = parseInt(req.body.uid);

        //작성자 본인 혹은 관리자만 삭제 가능
        if (uid === req.session.passport.user || req.session.passport.authority > 0) {
            const sql = `UPDATE BOARD SET ISDELETED = TRUE WHERE POSTID = ?;`;
            conn.query(sql, postid, err => {
                if (err) {
                    console.log(err);
                    res.send('fail');
    
                } else {
                    const sql = `SELECT BOARDID, POSTID, TITLE, CREATER, DATE_FORMAT(ADDTIME, '%Y-%m-%d-%H-%i') 
                    as ADDTIME FROM BOARD WHERE BOARDID = ? ORDER BY DSPORD, ADDTIME DESC;`
                    conn.query(sql, bid, (err, rows) => {
                        if (err) {
                            console.log(err);
                            res.send('infoFail');
                        } else {
                            res.send('delete');
                        }
                    });
                }
            });
        } 
        else {
            res.send('authorityFail');
        }
    }
});

module.exports = router;