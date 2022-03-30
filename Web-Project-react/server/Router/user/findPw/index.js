const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const route = express.Router();
const mysql = require('mysql');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const conn = mysql.createConnection({
    host: 'localhost',
	port: 3306,
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

route.post('/', async (req, res) => {
    console.log('find pw');
    const {email, isAuthcode} = req.body;

    console.log('process.env.FIND_EMAIL', process.env.FIND_EMAIL);
    console.log('process.env.FIND_PW ', process.env.FIND_PW );

    console.log('email', email, 'isAuthcode', isAuthcode);
    if(isAuthcode == "0") {
        const rand = parseInt(Math.random() * 1000000);
        const smtpTransport = nodemailer.createTransport({
            service: "gmail",
            host: 'smtp.gmail.com',
            auth: {
                user: process.env.FIND_EMAIL,  //이메일을 보내려는 실제 메일 ID
                pass: process.env.FIND_PW     //실제 메일 ID의 실제 비밀번호
            }
        });

        const mailOptions = {
            from: process.env.FIND_EMAIL,
            to: email,
            subject: '하이온넷 비밀번호 찾기 메일입니다.',
            text: `다음 인증코드를 입력해주세요.\n\n인증코드: ${rand}`
        };

        const sql = `SELECT UID FROM USER WHERE EMAIL = ?`;
        const exUser = await handleQuery(sql, email).catch(err => {
            console.log(err);
            //alert(res, "DB 에러", "/user/findPW");
        });
        //해당 이메일 사용자의 authcode 저장
        if (exUser.length > 0) {
            const sql = `UPDATE USER SET AUTHCODE = ? WHERE EMAIL = ?`;
            const values = [rand, email];
            await handleQuery(sql, values).catch(err => {
                console.log(err);
               // alert(res, "DB 에러", "/user/findPW");
            });
    
            smtpTransport.sendMail(mailOptions, (err, info) => {
                if(err) {
                    console.log(err);
                } 
                else {
                    console.log('Email send: ' + info.response);
                    res.send(true);
                }
            });
        }
        else {//이메일이 존재하지 않을 경우 false 전송
            res.send(false);
        }
    } 
    else {        
        const code = parseInt(req.body.code);
        const values = [email, code];
        const sql = `SELECT SALT FROM USER WHERE EMAIL = ? AND AUTHCODE = ?`;
        const exUser = await handleQuery(sql, values).catch(err => {
            console.log(err);
            //alert(res, "DB 에러", "/user/findPW");
        });

        if(exUser.length > 0) {
            const salt = exUser[0].SALT;
            const hashPW = crypto.createHash('sha512').update('a123456789' + salt).digest('hex');
            const values = [hashPW, email];
            const sql = `UPDATE USER SET PW = ?, AUTHCODE = NULL WHERE EMAIL = ?`;
            await handleQuery(sql, values).catch(err => {
                console.log(err);
               // alert(res, "비밀번호를 찾지 못하였습니다. 다시 시도해주세요.", "/user/findPW");
            });
            res.send(true);
        } 
        else {
            const sql = `UPDATE USER SET AUTHCODE = NULL WHERE EMAIL = ?`;
            await handleQuery(sql, email)
            .then(res.send(false))
            .catch(err => {
                console.log(err);
                res.send(false);
            });
        }
    }
});

module.exports = route;
