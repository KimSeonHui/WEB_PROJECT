const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const crypto = require('crypto');
const salt = crypto.randomBytes(128).toString('base64');
const sanitizeHtml = require('sanitize-html');

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
    //회원 목록 보기

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
});

router.post('/admin', async (req, res) => {
    if (!req.session.passport || req.session.passport.authority !== 2) {
        res.send('authorityFail');
    } 
    else {
        const [button, check] = [req.body.button, req.body.check];

        if(button === "setPW"){
            const pw = crypto.createHash('sha512').update('a123456789' + salt).digest('hex');
            let sql = `UPDATE USER SET PW = ?, SALT = ? WHERE`;
            const values = [pw, salt];

            if(typeof(check) === "string") {
                sql += ` UID = ?;`;
                values.push(check);

            } 
            else {
                for(let i = 0; i < check.length; i++) {
                    if(i === check.length-1) {
                        sql += ` UID = ?;`;
                    } 
                    else {
                        sql += ` UID = ? OR`;
                    }
                    values.push(check[i])
                }
            }

            await handleQuery(sql, values).then(() => {
                res.send('success');
            }).catch(err =>{
                console.log(err);
                res.send('error');
            })
        }
        //탈퇴
        else if(button === 'withdrawal') {
            let sql = "DELETE FROM USER WHERE";
            const values = [];

            if(typeof(check) === "string") {
                sql += ` UID = ?;`;
                values.push(check);

            } 
            else {
                for(let i = 0; i < check.length; i++) {
                    if(i === check.length-1) {
                        sql += ` UID = ?;`;
                    } 
                    else {
                        sql += ` UID = ? OR`;
                    }
                    values.push(check[i]);
                }
            }

            await handleQuery(sql, values).then(() => {
                res.send('success');
            })
            .catch(err => {
                console.log(err);
                res.send('error');
            })
        }
        else if(req.body.rename) {
            const name = sanitizeHtml(req.body.rename);
            const [sql, values] = [`UPDATE USER SET NAME = ? WHERE UID = ?;`, [name, req.body.uid]];
            await handleQuery(sql, values).then(() => {
                res.send('rename')
            })
            .catch(err => {
                console.log(err);
                res.send('error');
            })
        }
    }
    
});

module.exports = router;