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

router.get("/", (req, res) => {

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

router.post("/", (req, res) => {
    console.log('req.body', req.body);
    const {categoryLarge, categoryMedium, categorySmall, Title, Desc} = req.body;
    const creater = 'sunny';
    const uid = 1;
    const description = Desc;
    const title = Title;
    let bid = -1;
    const searchContent = '';

    if(categorySmall && (categorySmall !== '')) {
        bid = categorySmall;
    }        
    else if(categoryMedium !== '') {
        bid = categoryMedium;
    }
    else if(categoryLarge !== '') {
        bid = categoryLarge;
    }
    
    conn.beginTransaction(async tranErr => {
        if(tranErr) {
            console.log(`Transaction Error : ${tranErr}`);
        }
        else {
            const sql = `INSERT INTO BOARD (BOARDID, CREATER, TITLE, DESCRIPTION, SRCHCONT, UID, UPDTIME) VALUES (?,?,?,?,?,?,NOW())`;
			const values = [bid, creater, title, description, searchContent, uid];

            await handleQuery(sql, values)
				.then(async () => {
					const sql = `SELECT POSTID FROM BOARD WHERE TITLE = ? AND CREATER = ? AND
					DESCRIPTION = ? AND UID = ? ORDER BY POSTID DESC LIMIT 1;`;
					const values = [title, creater, description, uid];
					//작성 후 작성글 불러오기
					const postRow = await handleQuery(sql, values).catch(err => {
						console.log(err);
						conn.rollback();
						alert(res, "정보를 불러오지 못했습니다.", "/");
					});
						
					conn.commit();
					res.redirect(`/read/${postRow[0].POSTID}`);
				})
        }
    })


});

module.exports = router;