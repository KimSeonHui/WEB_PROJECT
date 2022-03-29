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
})

conn.connect();

//Promise DB connection
const handleQuery = (sql, values) => {
	return new Promise((resolve, reject) => {
		conn.query(sql, values, (err, rows) => {
			if (err) return reject(err);
			resolve(rows);
		})
	})
}

router.get("/:postId", async (req, res) => {
    const { postId } = req.params;

    let sql = `UPDATE BOARD SET VIEWS = VIEWS + 1 WHERE POSTID = ?;`;
    await handleQuery(sql, postId).catch(err => {
        console.log(err);
    })

    sql = `SELECT BOARDID, POSTID, TITLE, DESCRIPTION, NAME
         FROM BOARD LEFT JOIN CATEGORY ON BOARD.BOARDID = CATEGORY.CID
         WHERE POSTID = ?;`
    const postRows = await handleQuery(sql, postId).catch(err => {
        console.log(err);
		alert(res, "정보를 불러오지 못했습니다.", `/`);
    })

    sql = `SELECT * FROM CATEGORY`;
    conn.query(sql, (error, result) => {
        if(error) {
            console.log(error);
        }
        else {
            const categories = [];
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
                post : postRows,
                session : (req.session.passport !== undefined) ? req.session.passport : '',
            }
            res.send(info);       
        }
    })
});


module.exports = router;