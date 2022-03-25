const express = require('express');
const app = express();
const router = require('./Router/index');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser'); 


app.use(cors({
	origin : true,
	credentials : true
}));

app.use(cookieParser());
app.use(bodyParser.json());
app.enable('trust proxy');

app.use(session({
	key: "loginData",
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: false,
	proxy: true,
	cookie: {
		httpOnly: true,
		maxAge: 60*60*1000,
		secure: false
	},
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(router);

const port = 3002; 
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

