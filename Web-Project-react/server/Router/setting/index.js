const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const route = express.Router();
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

route.get('/', async (req, res) => {
    if (!req.session.passport || req.session.passport.authority !== 2) {
        res.send('authorityFail');
    } 
    else {
        console.log('query', req.query)
        const order = req.query.order;
        const sql = `SELECT UID, AUTHORITY, EMAIL, NAME, DATE_FORMAT(JOINDATE, '%Y-%m-%d %H : %i') AS JOINDATE,
                DATE_FORMAT(RECENTLOGIN, '%Y-%m-%d %H : %i') AS RECENTLOGIN FROM USER WHERE AUTHORITY > 0 ORDER BY ${order}`;
        const allUser = await handleQuery(sql).catch(err => {
            console.log(err);
            res.send('error');
        });
        console.log('allUser', allUser);

        const info = {
            session : (req.session.passport !== undefined) ? req.session.passport : '',
            allUser : allUser
        }
        res.send(info);
    }
});

route.post('/adminSelect', async (req, res) => {
    if (!req.session.passport || req.session.passport.authority !== 2) {
        res.send('authorityFail');
    }
    else {
        //관리자로 추가할 회원 검색
        const { keywordCategory, key} = req.body;
        
        const sql = `SELECT UID, EMAIL, NAME, DATE_FORMAT(JOINDATE, '%Y-%m-%d %H : %i') as JOINDATE,
        DATE_FORMAT(RECENTLOGIN, '%Y-%m-%d %H : %i') AS RECENTLOGIN FROM USER WHERE AUTHORITY < 1 AND ${keywordCategory} LIKE ?`;
        const user = await handleQuery(sql, key).catch(err => {
            console.log(err);
            res.send('error');
        });

        console.log('user', user);

        if(user.length > 0) {
            res.send(user);
        } else {
            res.send(false);
        }
    }
});

route.post('/addAdmin', async (req, res) => {
    if (!req.session.passport || req.session.passport.authority !== 2) {
       // alert(res, "관리자 권한이 필요합니다.", "/");
       res.send('authorityFail');
    }
    else {
        const {emails} = req.body;
        let sql = `UPDATE USER SET AUTHORITY = 1 WHERE EMAIL = ?`;

        for(let i = 1; i < emails.length; i++) {
            sql += `OR EMAIL = ?`;
        }
        
        await handleQuery(sql, emails)
        .then(res.send('addManager'))
        .catch(err => {
            console.error(err);
            res.send('error');
        });
    }
});

route.post('/deleteManager', async (req, res) => {
    if (!req.session.passport || req.session.passport.authority !== 2) {
        res.send('authorityFail');

    } 
    else {
        const {emails} = req.body;
        let sql = `UPDATE USER SET AUTHORITY = 0 WHERE EMAIL = ?`;

        for(let i = 1; i < emails.length; i++) {
            sql += `OR EMAIL = ?`;
        }

        await handleQuery(sql, emails)
        .then(res.send('deleteManager'))
        .catch(err => {
            console.error(err);
            res.send('error');
        });
    }
});

module.exports = route;