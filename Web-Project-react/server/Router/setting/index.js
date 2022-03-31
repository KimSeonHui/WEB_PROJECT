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
    console.log('setting');
    const session = (req.session.passport !== undefined) ? req.session.passport : '';
    res.send(session);
})

module.exports = route;