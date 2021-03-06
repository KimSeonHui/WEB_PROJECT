const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;

const img_upload = multer({dest: `public/image/${year}/${month}`});
const file_upload = multer({dest: `public/files/${year}/${month}`});

router.post('/images', img_upload.array('file'), async (req, res) => {
    console.log('upload images', req.files);
    const response = {url : []};

    //확장자 처리
	for(let i = 0; i < req.files.length; i++) {
		const ext = path.extname(req.files[i].originalname);
		fs.rename(`public/image/${year}/${month}/${path.basename(req.files[i].path)}`,
		`public/image/${year}/${month}/${path.basename(req.files[i].path)}${ext}`, err => {
			if(err) throw err;
		});
	
		const imgname = `/image/${year}/${month}/${path.basename(req.files[i].path)}${ext}`;
		response.url.push(imgname);
		console.log(response.url)
	}
	res.json(response);

});

router.post('/files', file_upload.array('file'), async(req, res) => {
	console.log('upload files', req.files);
	const response = {url : [], name : []};

	for(let i = 0; i < req.files.length; i++) {
		const ext = path.extname(req.files[i].originalname);
		fs.rename(`public/files/${year}/${month}/${path.basename(req.files[i].path)}`,
		`public/files/${year}/${month}/${path.basename(req.files[i].path)}${ext}`, err => {
			if(err) throw err;
		});
		
		const filename = `/files/${year}/${month}/${path.basename(req.files[i].path)}${ext}`;
		response.url.push(filename);
		response.name.push(req.files[i].originalname);
	}
	console.log(response);
	res.json(response);
});


module.exports = router;
