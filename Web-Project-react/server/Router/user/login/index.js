const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');

const conn = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
   password : 'ddFWSy965796',
   database : 'manWeb'
})
conn.connect();

const handleQuery = (sql, values) => {
	return new Promise((resolve, reject) => {
		conn.query(sql, values, (err, rows) => {
			if(err) return reject(err);
			resolve(rows);
		})
	})
}

router.get('/', (req, res) => {
    console.log('get user login')
})


passport.serializeUser((user, done) => {
    done(null, user.UID);
});

passport.deserializeUser(async (UID, done) => {
    const sql = 'SELECT UID, NAME, AUTHORITY FROM USER WHERE UID = ?';
    const loginUser = await handleQuery(sql, UID)
    .then(user => done(null, user))
    .catch(err => done(err));
});

passport.use('local', new LocalStrategy( {
   usernameField: 'email',
   passwordField: 'password',
   passReqToCallback: true
   }, async (req, email, password, done) => {
       try {
           //이메일 확인
           const sql = `SELECT SALT FROM USER WHERE EMAIL = ?`;
           const exEmail = await handleQuery(sql, email).catch(err => {
               console.log(err);
               console.log('DB 에러');
               res.send('DBerror');
           });
           //패스워드 확인
           if(exEmail.length > 0) {
               const sql = `SELECT UID, NAME, AUTHORITY FROM USER WHERE EMAIL = ? AND PW = ?`;
               const salt = exEmail[0].SALT;
               const hashPW = crypto.createHash('sha512').update(password + salt).digest('hex');
               const values = [email, hashPW];

               const exUser = await handleQuery(sql, values).catch(err => {
                   console.error(err);
                   console.log('DB 에러');
                   res.send('DBerror');
               });
               
               if(exUser.length > 0) {
                   const sql = `UPDATE USER SET RECENTLOGIN = NOW() WHERE UID = ?`;
                   await handleQuery(sql, exUser[0].UID).then(done(null, exUser[0]))
                   .catch(err => {
                       console.error(err);
                       console.log('DB 에러');
                       res.send('DBerror');
                   })
               } else {
                   done(null, false, { message: "비밀번호가 잘못 되었습니다."});
               }
           } else {
               done(null, false, { message: "이메일이 잘못 되었습니다."});
           }
       } catch(error) {
           console.error(error);
           done(error);
       } 
   }
));

router.post('/', (req, res, next) => {
   passport.authenticate('local', (authError, user) => {
      if(authError) {
          console.error(authError);
          return next(authError);
      } 
      if(!user) {
         console.error('아이디 또는 비밀번호가 잘못 되었습니다.');
         res.send('infoError');
      }
      return req.login(user, (loginError) => {
          if(loginError) {
              console.error(loginError);
              return next(loginError);
          }
          req.session.passport.name = user.NAME;
          req.session.passport.authority = user.AUTHORITY;
          res.send('login')
      });
  })
  (req, res, next);
})

module.exports = router;