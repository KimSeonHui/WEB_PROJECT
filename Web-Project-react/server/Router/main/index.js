const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const conn = mysql.createConnection({
    host : 'localhost',
    port : 3306,
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

router.get("/",  async (req, res) => {
    let sql = `SELECT BOARDID, POSTID, TITLE, CREATER, VIEWS, NAME, DATE_FORMAT(ADDTIME, '%Y-%m-%d-%H : %i') 
     as ADDTIME FROM BOARD LEFT JOIN CATEGORY ON BOARD.BOARDID = CATEGORY.CID 
    ORDER BY VIEWS DESC LIMIT 5;`

    const viewsTopRows = await handleQuery(sql).catch(err => {
        console.log(err);
		res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
		res.write(`<script>alert('오류가 발생하였습니다.')</script>`);
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
                post : viewsTopRows,
                session : (req.session.passport !== undefined) ? req.session.passport : '',
            }
            res.send(info);           
        }
    })
});

module.exports = router;