const express = require('express');
const app = express();
const router = require('./Router/index');
const bodyParser = require('body-parser'); 

app.use(bodyParser.json());
app.use(router);


const port = 3002; 
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})