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

route.get('/', (req, res) => {
    const session = (req.session.passport !== undefined) ? req.session.passport : '';
    res.send(session);
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

module.exports = route;