const express = require('express');
const app = express();
const router = require('./router/index');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const https = require('https');
const fs = require('fs');
const helmet = require('helmet');
const hpp = require('hpp');

const options = {
	key: fs.readFileSync('./localhost.key'),
	cert: fs.readFileSync('./localhost.crt'),
	requestCert: false,
	rejectUnauthorized: false
};

const csp = {
	directives: {
		defaultSrc: ["'self'","'unsafe-inline'", "https://cdn.jsdelivr.net", "https://cdnjs.cloudflare.com", 
		"https://cdn.startbootstrap.com", "https://use.fontawesome.com", "https://fonts.googleapis.com", 
		"https://fonts.gstatic.com", "https://code.jquery.com", "https://biz.haion.net", "data: https:", "blob:"]
	}
}

https.createServer(options, app).listen(3000);
//app.listen(3000);


//app.use(morgan('combined'));
app.use(cors({
	origin : true,
	credentials : true
}));
app.use(helmet({
	contentSecurityPolicy: csp
}));
app.use(hpp());
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set('view engine', 'ejs');
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
		secure: true
	},
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(router);