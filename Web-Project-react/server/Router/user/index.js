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

router.post('/changepw', async (req, res) => {
   const {newPW1, newPW2} = req.body;

   if(newPW1 === newPW2) {//새 비밀번호가 동일한지 체크
      const sql = `SELECT PW, SALT FROM USER WHERE UID = ?;`;
      const pw = await handleQuery(sql, req.session.passport.user).catch(err => {
         console.log(err);
         res.send('error');
      });
      const currentPW = crypto.createHash('sha512').update(req.body.currentPW + pw[0].SALT).digest('hex');

      if(newPW1 === req.body.currentPW) {//현재 비밀번호와 새 비밀번호가 동일한지 체크
         res.send('correspond');
      } 
      else if(pw[0].PW === currentPW) {//현재 비밀번호가 일치하는지 체크
         const hashPW = crypto.createHash('sha512').update(newPW1 + salt).digest('hex');
         const sql = `UPDATE USER SET PW = ?, SALT = ? WHERE UID = ? AND PW = ?;`;
         const values = [hashPW, salt, req.session.passport.user, currentPW];
         await handleQuery(sql, values).then(() => {
           res.send('changePW');
         })
         .catch(err => {
            console.log(err);
           res.send('fail');
         });
      } 
      else {
        res.send('currentPWErr');
      }
   } 
   else {
     res.send('newPWErr');
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