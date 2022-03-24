const express = require('express');
const app = express();
const router = require('./Router/index');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser'); 

app.use(bodyParser.json());
app.use(router);

app.use(session({
	key: "loginData",
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

const port = 3002; 
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})