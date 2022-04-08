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

router.get('/', async (req, res) => {

    const info = {
        session : req.session.passport !== undefined ? req.session.passport : ''
    }
    res.send(info);
});

module.exports = router;