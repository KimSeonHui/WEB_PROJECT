const express = require('express');
const app = express();
const router = require('./Router/index');

app.use(router);

const port = 3002; 
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})