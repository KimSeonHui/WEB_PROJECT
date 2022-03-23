const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const crypto = require('crypto');
const salt = crypto.randomBytes(128).toString('base64');

const conn = mysql.createConnection({
   host : 'localhost',
   port : 3306,
   user: 'root',
   password : 'ddFWSy965796',
   database : 'manWeb'
});

const handleQuery = (sql, values) => {
	return new Promise((resolve, reject) => {
		conn.query(sql, values, (err, rows) => {
			if(err) return reject(err);
			resolve(rows);
		})
	});
}

function alert(res, str, url) {
   res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
   res.write(`<script>alert('${str}')</script>`);
   res.write(`<script>window.location=\"${url}\"</script>`);
}

router.get("/", (req, res) => {
   res.send('hi');
});

router.post('/',  async (req, res) => {
   const {emails, username, password } = req.body;

   const sql = `SELECT * from USER WHERE EMAIL=? OR NAME=?`;
   const values = [emails, username];
   const exUser = await handleQuery(sql, values).catch((err) => {
      console.log(err);
      alert(res, "DB 접속 오류", "/user/signup");
   });

   console.log('exUser', exUser);
   if(exUser.length > 0) {
      alert(res, "이미 가입되어 있는 이메일 혹은 이름입니다.", "/user/signup");
   }
   else {
      const hashPW = crypto.createHash('sha512').update(password + salt).digest('hex');
      const sql = `INSERT INTO USER(EMAIL, NAME, PW, SALT, JOINDATE) VALUES (?,?,?,?, NOW());`;
      const values = [emails, username, hashPW, salt];
      await handleQuery(sql, values).then(async () =>{
         console.log('가입 완료');
         alert(res, "회원가입이 완료되었습니다:) 다시 로그인 해주세요.", "/user/login");
      })
      .catch(err => {
         console.error(err)
         alert(res, "잘못된 양식 입니다. 다시 입력해 주세요.", "/user/signup");
      });
   }
})

module.exports = router;