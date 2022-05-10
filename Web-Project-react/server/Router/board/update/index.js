const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const sanitizeHtml = require('sanitize-html');

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
    if(!req.session.passport) {
        res.send('notLogined');
    }
    else {
        const postid = req.params.postid;
        const postCategory = {};
        let sql = `SELECT b.BOARDID, b.POSTID, b.TITLE, b.DESCRIPTION, b.CREATER, b.UID, c.CID, c.LEVEL FROM BOARD as b 
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
                postCategory.large = postRows[0].CID;
                postCategory.medium = false;
                postCategory.small = false;
                sql = `SELECT CID FROM CATEGORY WHERE CID = ?`;    
            } 
            else if(postRows[0].LEVEL === 1) {
                postCategory.medium = postRows[0].CID;
                postCategory.small = false;
                sql = `SELECT t1.CID as large FROM CATEGORY as t1 LEFT JOIN CATEGORY as t2 ON t2.PID = t1.CID
                    WHERE t2.CID = ?`;
                
            } 
            else {
                postCategory.small = postRows[0].CID;
                sql = `SELECT t1.CID as large, t2.CID as medium FROM CATEGORY as t1 LEFT JOIN 
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
    }
});

router.post('/', async (req, res) => {
    if(!req.session.passport) {
        res.send('notLogined');
    }
    else {
        let title = req.body.Title;

        //카테고리 선택에 따른 boardid 지정
        let bid;
        if (req.body.categorySmall && (req.body.categorySmall != ''))
            bid = req.body.categorySmall;
        else if (req.body.categoryMedium != '')
            bid = req.body.categoryMedium;
        else if (req.body.categoryLarge != '')
            bid = req.body.categoryLarge;

        const description = req.body.Desc;

        //description에서 html 태그를 제거하여 검색에 사용할 변수
        const searchContent = sanitizeHtml(req.body.Desc);

        conn.beginTransaction(async tranErr => {
            if (tranErr) {
                console.log(`Transaction Error : ${tranErr}`);
            } else {
                const sql = `UPDATE BOARD SET BOARDID = ?, TITLE = ?, DESCRIPTION = ?, SRCHCONT = ?, UPDTIME = NOW(), TEMP = FALSE WHERE POSTID = ?`;
                const [values] = [[bid, title, description, searchContent, req.body.postid]];

                await handleQuery(sql, values).then(async () => {
                    conn.commit();
                    res.send('update');
                })
                .catch(async err => {
                        console.log(err);
                        res.send('error');
                });
            }
        });
    }
});

module.exports = router;