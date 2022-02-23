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

//Promise DB connection
const handleQuery = (sql, values) => {
	return new Promise((resolve, reject) => {
		conn.query(sql, values, (err, rows) => {
			if (err) return reject(err);
			resolve(rows);
		})
	})
}

router.get("/:postId", (req, res) => {


    let sql = `SELECT * FROM CATEGORY`;
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
            res.send(categories);           
        }
    })
});


module.exports = router;