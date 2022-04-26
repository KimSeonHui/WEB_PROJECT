const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;

const img_upload = multer({dest: `public/image/${year}/${month}`});

router.post('/images', img_upload.array('file'), async (req, res) => {
    console.log('upload images', req.files);
    const response = {};

    //확장자 처리
    const ext = path.extname(req.files[0].originalname);
	fs.rename(`public/image/${year}/${month}/${path.basename(req.files[0].path)}`,
	`public/image/${year}/${month}/${path.basename(req.files[0].path)}${ext}`, err => {
		if(err) throw err;
	});

	const imgname = `/image/${year}/${month}/${path.basename(req.files[0].path)}${ext}`;
	response.url = imgname;
	console.log(response.url)
	res.json(response);

});


module.exports = router;
