const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const crypto = require('crypto');
const salt = crypto.randomBytes(128).toString('base64');

const conn = mysql.createConnection({
   host : 'localhost',
   port : 3306,
   user: 'root',
   password : process.env.DB_PW,
   database : process.env.DB_NAME
});

const handleQuery = (sql, values) => {
	return new Promise((resolve, reject) => {
		conn.query(sql, values, (err, rows) => {
			if(err) return reject(err);
			resolve(rows);
		})
	});
}

router.post('/signup',  async (req, res) => {
   const {emails, username, password } = req.body;

   const sql = `SELECT * from USER WHERE EMAIL=? OR NAME=?`;
   const values = [emails, username];
   const exUser = await handleQuery(sql, values).catch((err) => {
      console.log(err);
      res.send('DBerror');
   });

   console.log('exUser', exUser);
   if(exUser.length > 0) {
      res.send('exUser');
   }
   else {
      const hashPW = crypto.createHash('sha512').update(password + salt).digest('hex');
      const sql = `INSERT INTO USER(EMAIL, NAME, PW, SALT, JOINDATE) VALUES (?,?,?,?, NOW());`;
      const values = [emails, username, hashPW, salt];
      await handleQuery(sql, values).then(async () =>{
         res.send('signup');
      })
      .catch(err => {
         console.error(err)
         res.send('error');
      });
   }
});


router.get("/logout", (req, res) => {
  if(!req.session.passport) {
     res.send('not Logined')
  }
  else {
   req.session.destroy();
   res.clearCookie('loginData');
   res.send('logout')
  }
});


module.exports = router;