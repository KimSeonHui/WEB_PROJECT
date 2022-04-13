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
        const categories = [];
        let sql = `SELECT * FROM CATEGORY`;
        conn.query(sql, (error, result) => {
            if(error) {
                console.log(error);
            }
            else {
                for(node of result) {
                    const data = {
                        id : `${node.CID}`,
                        name : `${node.NAME}`,
                        parent : node.PID === null ? '#' : node.PID,
                        level : `${node.LEVEL}`
                    }
                    categories.push(data);
                }
                const info = {
                    category : categories,
                    session : (req.session.passport !== undefined) ? req.session.passport : '',
                }
                res.send(info);           
            }
        });
    }
});

module.exports = router;