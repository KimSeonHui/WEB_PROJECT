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
    if (!req.session.passport || req.session.passport.authority !== 2) {
        res.send('authorityFail')

    } 
    else {
        //특정 회원 작성 글 보기
        if (req.query.uid) {
            const { page, uid } = req.query;
            const sql = `SELECT t2.NAME as category, t1.POSTID, t1.TITLE, t1.CREATER, t1.ISDELETED,
            DATE_FORMAT(t1.ADDTIME, '%Y-%m-%d-%H : %i') as ADDTIME, DATE_FORMAT(t1.UPDTIME, '%Y-%m-%d-%H : %i') as UPDTIME
			FROM BOARD as t1 LEFT JOIN CATEGORY as t2 ON t1.BOARDID = t2.CID
            WHERE UID = ? ORDER BY ISDELETED, ADDTIME;`;

            const userPost = await handleQuery(sql, uid).catch(err => {
                console.log(err);
                res.send('error');
            });

            const info = {
                session : req.session.passport !== undefined ? req.session.passport : '',
                users : userPost,
                query : {order : 'ADDTIME', page : userPost.length > 0 ? page : 1, filter : 'no'}
            }
            res.send(info);

        //회원 목록 보기
        } 
        else {
            const page = req.query.page;
            const order = req.query.order;

            //정렬 적용
            if(order) {
                const sql = `SELECT UID, EMAIL, NAME, AUTHORITY, DATE_FORMAT(JOINDATE, '%Y-%m-%d %H : %i') AS JOINDATE,
                DATE_FORMAT(RECENTLOGIN, '%Y-%m-%d %H : %i') AS RECENTLOGIN FROM USER ORDER BY ${order};`;
                const orderedUser = await handleQuery(sql).catch(err => {
                    console.log(err);
                    res.send('error');
                });
                const info = {
                    session : req.session.passport !== undefined ? req.session.passport : '',
                    users : orderedUser,
                    query : {order : order, page : orderedUser.length > 0 ? page : 1}
                }
                res.send(info);

            } 
            else {//정렬 미적용
                const sql = `SELECT UID, EMAIL, NAME, AUTHORITY, DATE_FORMAT(JOINDATE, '%Y-%m-%d %H : %i') AS JOINDATE,
                DATE_FORMAT(RECENTLOGIN, '%Y-%m-%d %H : %i') AS RECENTLOGIN FROM USER`;
                const allUser = await handleQuery(sql).catch(err => {
                    console.log(err);
                    res.send('error');
                });

                const info = {
                    session : req.session.passport !== undefined ? req.session.passport : '',
                    users : allUser,
                    query : {order : order, page : allUser.length > 0 ? page : 1}
                }
                res.send(info);
            }
        }
    }
});

module.exports = router;