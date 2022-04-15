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

router.get('/', async (req, res) => {
    if (!req.session.passport || req.session.passport.authority !== 2) {
        res.send('authorityFail');
    }
    else {
        const categories = [];
        let sql = `SELECT * FROM CATEGORY`;
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
                }
                res.send(info);           
            }
        });
    }
});

router.post('/', async (req, res) => {
    if(!req.session.passport || req.session.passport.authority !== 2) {
        res.redirect('/');
    } 
    else {

        //수정한 새 카테고리
        const newCategories = req.body.allCategories;
        const values = [];

        console.log('new', newCategories)
        let sql = `INSERT INTO CATEGORY  VALUES `;
    
        for(let i = 0; i < newCategories.length; i++) {
            const [cid, name, level] = [newCategories[i].id, newCategories[i].name, newCategories[i].level];
    
            if(newCategories[i].parent === "#") {
                sql += `(?, ?, ?, ?), `;
                values.push(cid, name, null, level);
            } 
            else {
                const pid = newCategories[i].parent;
                sql += `(?, ?, ?, ?), `;
                values.push(cid, name, pid, level)
            }
        }

        sql = sql.slice(0, sql.length - 2) + ';';

        console.log('sql', sql);

        conn.beginTransaction(async tranErr => {
            if(tranErr) {
                console.log(`Transaction Error : ${tranErr}`);
            } 
            else {
                await conn.query(`DELETE FROM CATEGORY;`);
                await handleQuery(sql, values).then(async () => {
                    //정상 실행시 커밋
                    console.log("commit");
                    await conn.commit();
                }).catch(async err => {
                    //오류 발생시 트랜잭션 롤백
                    console.log(err);
                    console.log("rollback");
                    await conn.rollback();
                    res.send('error');
                });

                const newCates = [];

                await conn.query('SELECT * FROM CATEGORY', (err, result) => {
                    if(err) {
                        console.log(err);
                    }
                    else {
                        for(let node of result) {
                            const data = {
                                id : `${node.CID}`,
                                name : `${node.NAME}`,
                                parent : node.PID === null ? '#' : node.PID,
                                level : `${node.LEVEL}`
                            }
                            newCates.push(data);
                        }
                        res.send(newCates);
                    }
                });
            }
        });
          
    }

});

module.exports = router;