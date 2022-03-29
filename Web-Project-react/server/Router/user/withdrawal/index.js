const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const route = express.Router();
const mysql = require('mysql');
const crypto = require('crypto');

const conn = mysql.createConnection({
    host : 'localhost',
    port : 3306,
    user : 'root',
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

route.post('/', async (req, res) => {
    console.log('withdrawal');

    if (!req.session.passport) {
       res.send('notLogined');
    }
    else if (req.session.passport.authority == 2){
       res.send('admin');
    }
    else {
        const { email, password } = req.body;
        const sql = `SELECT * FROM USER WHERE EMAIL = ?`;
        const exUser = await handleQuery(sql, email).catch(err => {
            console.error(err);
        });

        if (exUser.length > 0) {
            const hashPW = crypto.createHash('sha512').update(password + exUser[0].SALT).digest('hex');

            if (exUser[0].PW === hashPW) {
                const sql = `DELETE FROM USER WHERE EMAIL = ? AND PW = ?`;
                const values = [email, hashPW];

                await handleQuery(sql, values)
                .then(res.send('withdrawal'))
                .catch(err => {
                    console.error(err);
                    res.send('DBError')
                });
            }
            else {
                res.send('pwError');
            }
        }
        else {
            res.send('emailError');
        }
    }
})

module.exports = route;