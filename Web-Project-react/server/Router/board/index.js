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

const handleQuery = (sql, values) => {
	return new Promise((resolve, reject) => {
		conn.query(sql, values, (err, rows) => {
			if(err) return reject(err);
			resolve(rows);
		})
	})
}

router.get("/:cid/:page", async (req, res) => {
    const { cid, page } = req.params;
    const categories = [];

    let sql = `SELECT BOARDID, POSTID, TITLE, CREATER, VIEWS, UID, 
            DATE_FORMAT(ADDTIME, '%Y-%m-%d-%H : %i') as ADDTIME FROM BOARD 
             WHERE BOARDID = ? AND TEMP = 0 AND ISDELETED = 0 ORDER BY DSPORD, ADDTIME
             `;

    const boardRows = await handleQuery(sql, cid);


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
                post : boardRows,
                page : page,
            }
            res.send(info); 
        }
    });
});

module.exports = router;