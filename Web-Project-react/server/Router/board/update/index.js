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

router.get('/:postid', async (req, res) => {
    console.log('update', req.params);

    const postid = req.params.postid;
    const postCategory = {};
    let sql = `SELECT b.BOARDID, b.POSTID, b.TITLE, b.DESCRIPTION, b.CREATER, b.UID, c.NAME, c.LEVEL FROM BOARD as b 
        LEFT JOIN CATEGORY as c ON b.BOARDID = c.CID WHERE b.POSTID = ?`;

    const postRows = await handleQuery(sql, postid).catch(err => {
        console.log(err);
        alert(res, "오류가 발생했습니다.", "/");
    });

    //작성자 혹은 관리자만 수정 가능
    if (postRows[0].UID === req.session.passport.user || req.session.passport.authority > 0) {
        //수정 시 카테고리 자동 선택 데이터
        const std = postRows[0].BOARDID;
        if(postRows[0].LEVEL === 0) {
            postCategory.large = postRows[0].NAME;
            postCategory.medium = false;
            postCategory.small = false;
            sql = `SELECT NAME FROM CATEGORY WHERE CID = ?`;    
        } 
        else if(postRows[0].LEVEL === 1) {
            postCategory.medium = postRows[0].NAME;
            postCategory.small = false;
            sql = `SELECT t1.NAME as large FROM CATEGORY as t1 LEFT JOIN CATEGORY as t2 ON t2.PID = t1.CID
                WHERE t2.CID = ?`;
            
        } 
        else {
            postCategory.small = postRows[0].NAME;
            sql = `SELECT t1.NAME as large, t2.NAME as medium FROM CATEGORY as t1 LEFT JOIN 
            CATEGORY as t2 ON t2.PID = t1.CID LEFT JOIN CATEGORY as t3 ON t3.PID = t2.CID WHERE t3.CID = ?`;
        }
            
        const postCateInfo = await handleQuery(sql, std).catch(err => {
            console.log(err);
            alert(res, "오류가 발생했습니다.", "/");
        });

        if(postCateInfo[0].medium) {
            postCategory.medium = postCateInfo[0].medium;
        }
        if(postCateInfo[0].large) {
            postCategory.large = postCateInfo[0].large;
        }
    }
    const categories = [];

    sql = `SELECT * FROM CATEGORY`;
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
                postCategory : postCategory,
                content : postRows[0]

            }
            res.send(info);           
        }
    })
});

module.exports = router;