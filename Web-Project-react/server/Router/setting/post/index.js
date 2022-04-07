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
        res.send('authorityFail');
    }
    else {
        console.log('query', req.query)
        const { order, page, filter } = req.query;
        
        if(filter !== "no") {
            //필터 적용
            const sql = `SELECT t2.NAME as category, t1.POSTID, t1.TITLE, t1.CREATER, t1.ISDELETED,
            DATE_FORMAT(t1.ADDTIME, '%Y-%m-%d-%H : %i') as ADDTIME, DATE_FORMAT(t1.UPDTIME, '%Y-%m-%d-%H : %i') as UPDTIME
            FROM BOARD as t1 LEFT JOIN CATEGORY as t2 ON t1.BOARDID = t2.CID WHERE t1.ISDELETED = ? ORDER BY ${order};`;
            const allPost = await handleQuery(sql, filter).catch(err => {
                console.log(err);
                alert(res, "오류가 발생했습니다.", "/setting/post?order=category&page=1&filter=no");
            });
            const info = {
                session : (req.session.passport !== undefined) ? req.session.passport : '',
                post : allPost,
                query : {order : order, page : allPost.length > 0 ? page : 1, filter : filter}
            }
            res.send(info);
        } 
        else {//필터 미적용
            const sql = `SELECT t2.NAME as category, t1.POSTID, t1.TITLE, t1.CREATER, t1.ISDELETED,
            DATE_FORMAT(t1.ADDTIME, '%Y-%m-%d-%H : %i') as ADDTIME, DATE_FORMAT(t1.UPDTIME, '%Y-%m-%d-%H : %i') as UPDTIME
            FROM BOARD as t1 LEFT JOIN CATEGORY as t2 ON t1.BOARDID = t2.CID ORDER BY ISDELETED, ${order};`;
            const allPost = await handleQuery(sql).catch(err => {
                console.log(err);
                res.send('error');
            });
            const info = {
                session : (req.session.passport !== undefined) ? req.session.passport : '',
                post : allPost,
                query : {order : order, page : allPost.length > 0 ? page : 1, filter : filter}
            }
            res.send(info);
        }
    }

});

router.post('/admin', async (req, res) => {
    if (!req.session.passport || req.session.passport.authority !== 2) {
        res.send('authorityFail')
    } 
    else {
        //button: 기능 종류, check: 선택된 회원
        const [button, check, values] = [req.body.modify, req.body.check, []];
        let sql = "UPDATE BOARD SET ISDELETED = ";
        const word = button === "open" ? "공개" : "삭제";

        if(button === "open") {
            sql += "FALSE WHERE";
        } else {
            sql += "TRUE WHERE";
        }

        if(typeof(check) === "string") {
            sql += ` POSTID = ?;`;
            values.push(check);

        } else {
            for(let i = 0; i < check.length; i++) {
                if(i === check.length-1) {
                    sql += ` POSTID = ?;`;
                } else {
                    sql += ` POSTID = ? OR`;
                }
                values.push(check[i]);
            }
        }

        await handleQuery(sql, values).then(
            res.send(word)
        )
        .catch(err => {
            console.log(err);
            res.send('error')
        });  
    }
})


module.exports = router;