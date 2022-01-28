const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
   res.send('hi');
});

router.post('/',  (req, res) => {
   const {emails, username, password } = req.body;
   console.log('body', emails, username, password);
})

module.exports = router;