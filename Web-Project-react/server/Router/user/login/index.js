const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
   res.send('hi login');
});

module.exports = router;